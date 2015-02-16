d3.sankey = function() {
  var sankey = {},
      nodeWidth = 24,
      nodePadding = 8,
      linkSpacing = 5,
      arrowheadScaleFactor = 0,
      size = [1, 1],
      nodes = [],
      links = []

  sankey.nodeWidth = function(_) {
    if (!arguments.length) return nodeWidth;
    nodeWidth = +_;
    return sankey;
  };

  sankey.nodePadding = function(_) {
    if (!arguments.length) return nodePadding;
    nodePadding = +_;
    return sankey;
  };

  sankey.linkSpacing = function(_) {
    if (!arguments.length) return linkSpacing;
    linkSpacing = +_;
    return sankey;
  };

  sankey.arrowheadScaleFactor = function(_) {
    if (!arguments.length) return arrowheadScaleFactor;
    arrowheadScaleFactor = +_;
    return sankey;
  };

  sankey.nodes = function(_) {
    if (!arguments.length) return nodes;
    nodes = _;
    return sankey;
  };

  sankey.links = function(_) {
    if (!arguments.length) return links;
    links = _;
    return sankey;
  };

  sankey.size = function(_) {
    if (!arguments.length) return size;
    size = _;
    return sankey;
  };

  sankey.layout = function(iterations) {
    computeNodeLinks();
    computeNodeValues();
    computeNodeXPositions();
    computeNodeYPositions(iterations);
    computeLinkYPositions();
    return sankey;
  };

  sankey.relayout = function() {
    computeLinkYPositions();
    return sankey;
  };

  sankey.link = function() {
    var curvature = .5;

    function link(d) {
      if (d.direction === 'left->right') {
        return leftToRightLink(d)
      } else {
        return rightToLeftLink(d)
      }
    }

    function leftToRightLink(d) {
      var arrowLength = d.dy * arrowheadScaleFactor;
      var straightSectionLength = d.dy / 4;
      var x0 = d.source.x + d.source.dx + straightSectionLength + arrowLength,
          x1 = d.target.x - straightSectionLength - arrowLength,
          xi = d3.interpolateNumber(x0, x1),
          x2 = xi(curvature),
          x3 = xi(1 - curvature),
          y0 = d.source.y + d.sy + d.dy / 2,
          y1 = d.target.y + d.ty + d.dy / 2;
      return "M" + (x0 - straightSectionLength - arrowLength) + "," + y0
           + "L" + (x0 - straightSectionLength) + "," + y0
           + "L" + x0 + "," + y0
           + "C" + x2 + "," + y0
           + " " + x3 + "," + y1
           + " " + x1 + "," + y1
           + "L" + (x1 + straightSectionLength) + "," + y1
    }

    function rightToLeftLink(d) {
      var arrowLength = d.dy * arrowheadScaleFactor;
      var straightSectionLength = d.dy / 4;
      var x0 = d.source.x + d.source.dx + straightSectionLength + arrowLength,
          x1 = d.target.x - straightSectionLength - arrowLength,
          xi = d3.interpolateNumber(x0, x1),
          x2 = xi(curvature),
          x3 = xi(1 - curvature),
          y0 = d.source.y + d.sy + d.dy / 2,
          y1 = d.target.y + d.ty + d.dy / 2;
      return "M" + (x0 - straightSectionLength - arrowLength) + "," + y0
           + "M" + (x0 - straightSectionLength) + "," + y0
           + "L" + x0 + "," + y0
           + "C" + x2 + "," + y0
           + " " + x3 + "," + y1
           + " " + x1 + "," + y1
           + "L" + (x1 + straightSectionLength + arrowLength) + "," + y1;
    }

    link.curvature = function(_) {
      if (!arguments.length) return curvature;
      curvature = +_;
      return link;
    };

    return link;
  };

  // Populate the sourceLinks and targetLinks for each node.
  function computeNodeLinks() {
    nodes.forEach(function(node) {
      node.sourceLinks = [];
      node.targetLinks = [];
    });
    links.forEach(function(link) {
      var source = link.source,
          target = link.target;
      // If the source and target are numbers, assume they are indices.
      if (typeof source === "number") source = link.source = nodes[link.source];
      if (typeof target === "number") target = link.target = nodes[link.target];
      source.sourceLinks.push(link);
      target.targetLinks.push(link);
    });
  }

  // Compute the height of each node by summing the associated links.
  function computeNodeValues() {
    nodes.forEach(function(node) {
      node.value = Math.max(
        d3.sum(node.sourceLinks, value),
        d3.sum(node.targetLinks, value)
      );
      node.linkSpaceCount = Math.max(node.sourceLinks.length, node.targetLinks.length) - 1
    });
  }

  // Iteratively assign the x-position for each node.
  // Nodes are assigned the maximum height of incoming neighbors plus one;
  // nodes with no incoming links are assigned height zero, while
  // nodes with no outgoing links are assigned the maximum height.
  function computeNodeXPositions() {
    var remainingNodes = nodes,
        nextNodes,
        x = 0;

    while (remainingNodes.length) {
      nextNodes = [];
      remainingNodes.forEach(function(node) {
        node.x = x;
        node.dx = nodeWidth;
        node.sourceLinks.forEach(function(link) {
          if (nextNodes.indexOf(link.target) < 0) {
            nextNodes.push(link.target);
          }
        });
      });
      remainingNodes = nextNodes;
      ++x;
    }

    //
    moveSinksRight(x);
    scaleNodeXPositions((size[0] - nodeWidth) / (x - 1));
  }

  function moveSourcesRight() {
    nodes.forEach(function(node) {
      if (!node.targetLinks.length) {
        node.x = d3.min(node.sourceLinks, function(d) { return d.target.x; }) - 1;
      }
    });
  }

  function moveSinksRight(x) {
    nodes.forEach(function(node) {
      if (!node.sourceLinks.length) {
        node.x = x - 1;
      }
    });
  }

  function scaleNodeXPositions(kx) {
    nodes.forEach(function(node) {
      node.x *= kx;
    });
  }

  function computeNodeYPositions(iterations) {
    var nodesByXPosition = d3.nest()
        .key(function(d) { return d.x; })
        .sortKeys(d3.ascending)
        .entries(nodes)
        .map(function(d) { return d.values; });

    //
    initializeNodeYPosition();
    resolveCollisions();
    for (var alpha = 1; iterations > 0; --iterations) {
      relaxRightToLeft(alpha *= .99);
      resolveCollisions();
      relaxLeftToRight(alpha);
      resolveCollisions();
    }

    function initializeNodeYPosition() {
      var ky = d3.min(nodesByXPosition, function(nodes) {
        var linkSpacesCount = d3.sum(nodes, function(node) {
          return node.linkSpaceCount
        })

        return (size[1] - (nodes.length - 1) * nodePadding - linkSpacesCount * linkSpacing) / d3.sum(nodes, value);
      });

      nodesByXPosition.forEach(function(nodes) {
        nodes.forEach(function(node, i) {
          node.y = i;
          node.dy = node.value * ky + linkSpacing * node.linkSpaceCount;
        });
      });

      links.forEach(function(link) {
        link.dy = link.value * ky;
      });
    }

    function relaxLeftToRight(alpha) {
      nodesByXPosition.forEach(function(nodes, height) {
        nodes.forEach(function(node) {
          if (node.targetLinks.length) {
            var y = d3.sum(node.targetLinks, weightedSource) / d3.sum(node.targetLinks, value);
            node.y += (y - center(node)) * alpha;
          }
        });
      });

      function weightedSource(link) {
        return center(link.source) * link.value;
      }
    }

    function relaxRightToLeft(alpha) {
      nodesByXPosition.slice().reverse().forEach(function(nodes) {
        nodes.forEach(function(node) {
          if (node.sourceLinks.length) {
            var y = d3.sum(node.sourceLinks, weightedTarget) / d3.sum(node.sourceLinks, value);
            node.y += (y - center(node)) * alpha;
          }
        });
      });

      function weightedTarget(link) {
        return center(link.target) * link.value;
      }
    }

    function resolveCollisions() {
      nodesByXPosition.forEach(function(nodes) {
        var node,
            dy,
            y0 = 0,
            n = nodes.length,
            i;

        // Push any overlapping nodes down.
        nodes.sort(ascendingYPosition);
        for (i = 0; i < n; ++i) {
          node = nodes[i];
          dy = y0 - node.y;
          if (dy > 0) node.y += dy;
          y0 = node.y + node.dy + nodePadding;
        }

        // If the bottommost node goes outside the bounds, push it back up.
        dy = y0 - nodePadding - size[1];
        if (dy > 0) {
          y0 = node.y -= dy;

          // Push any overlapping nodes back up.
          for (i = n - 2; i >= 0; --i) {
            node = nodes[i];
            dy = node.y + node.dy + nodePadding - y0;
            if (dy > 0) node.y -= dy;
            y0 = node.y;
          }
        }
      });
    }

    function ascendingYPosition(a, b) {
      return a.y - b.y;
    }
  }

  function computeLinkYPositions() {
    nodes.forEach(function(node) {
      node.sourceLinks.sort(ascendingTargetYPosition);
      node.targetLinks.sort(ascendingSourceYPosition);
    });
    nodes.forEach(function(node) {
      var sy = 0, ty = 0;
      node.sourceLinks.forEach(function(link) {
        link.sy = sy;
        sy += link.dy + linkSpacing;
      });
      node.targetLinks.forEach(function(link) {
        link.ty = ty;
        ty += link.dy + linkSpacing;
      });
    });

    function ascendingSourceYPosition(a, b) {
      return a.source.y - b.source.y;
    }

    function ascendingTargetYPosition(a, b) {
      return a.target.y - b.target.y;
    }
  }

  function center(node) {
    return node.y + node.dy / 2;
  }

  function value(link) {
    return link.value;
  }

  return sankey;
};