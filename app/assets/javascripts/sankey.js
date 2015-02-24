d3.sankey = function() {
  var sankey = {},
      nodeWidth = 24,
      nodePadding = 8,
      linkSpacing = 5,
      arrowheadScaleFactor = 0,
      size = [1, 1],
      nodes = [],
      links = [],
      xScaleFactor = 1,
      yScaleFactor = 1

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
    computeConnectedNodes();
    computeNodeXPositions();
    computeLeftAndRightLinks();
    computeNodeValues();
    computeNodeYPositions(iterations);
    computeLinkYPositions();
    return sankey;
  };

  sankey.relayout = function() {
    computeLeftAndRightLinks();
    computeNodeValues();
    computeLinkYPositions();
    return sankey;
  };

  sankey.link = function() {
    var curvature = .7;

    function link(d) {
      if (d.source.x < d.target.x) {
        return leftToRightLink(d);
      } else {
        return rightToLeftLink(d);
      }
    }

    function leftToRightLink(d) {
      var arrowLength = d.dy * arrowheadScaleFactor;
      var straightSectionLength = d.dy / 4;
      var x0 = d.source.x + d.source.dx
          x1 = d.target.x - straightSectionLength - arrowLength,
          xi = d3.interpolateNumber(x0, x1),
          x2 = xi(curvature),
          x3 = xi(1 - curvature),
          y0 = d.source.y + d.sy + d.dy / 2,
          y1 = d.target.y + d.ty + d.dy / 2;
      return "M" + x0 + "," + y0
           + "L" + x0 + "," + y0
           + "C" + x2 + "," + y0
           + " " + x3 + "," + y1
           + " " + x1 + "," + y1
           + "L" + (x1 + straightSectionLength) + "," + y1
    }

    function rightToLeftLink(d) {
      var arrowLength = d.dy * arrowheadScaleFactor;
      var straightSectionLength = d.dy / 4;
      var x0 = d.source.x
          x1 = d.target.x + d.target.dx + straightSectionLength + arrowLength,
          xi = d3.interpolateNumber(x0, x1),
          x2 = xi(curvature),
          x3 = xi(1 - curvature),
          y0 = d.source.y + d.sy + d.dy / 2,
          y1 = d.target.y + d.ty + d.dy / 2;
      return "M" + x0 + "," + y0
           + "L" + x0 + "," + y0
           + "C" + x2 + "," + y0
           + " " + x3 + "," + y1
           + " " + x1 + "," + y1
           + "L" + (x1 - straightSectionLength) + "," + y1
    }

    link.curvature = function(_) {
      if (!arguments.length) return curvature;
      curvature = +_;
      return link;
    };

    return link;
  };

  sankey.connected = function(nodeA, nodeB) {
    return nodeA.connectedNodes.indexOf(nodeB) > 0;
  };

  // Populate the sourceLinks and targetLinks for each node.
  function computeNodeLinks() {
    nodes.forEach(function(node) {
      node.sourceLinks = [];
      node.rightLinks = [];
      node.targetLinks = [];
      node.leftLinks = [];
      node.connectedNodes = [];
    });
    links.forEach(function(link) {
      var source = link.source,
          target = link.target;
      // If the source and target are numbers, assume they are indices.
      if (typeof source === "number") source = link.source = nodes[link.source];
      if (typeof target === "number") target = link.target = nodes[link.target];
      source.sourceLinks.push(link);
      source.rightLinks.push(link);
      target.targetLinks.push(link);
      source.leftLinks.push(link);
    });
  }

  // Compute the value of each node by summing the associated links.
  // Compute the number of spaces between the links
  // Compute the number of source links for later decrementing
  function computeNodeValues() {
    nodes.forEach(function(node) {
      node.value = Math.max(
        d3.sum(node.leftLinks, value),
        d3.sum(node.rightLinks, value)
      );
      node.dy = node.value * yScaleFactor + linkSpacing * node.linkSpaceCount;
      node.linkSpaceCount = Math.max(Math.max(node.leftLinks.length, node.rightLinks.length) - 1, 0)
    });
  }

  function computeConnectedNodes() {
    var source, target;
    links.forEach(function(d) {
      source = d.source
      target = d.target
      if (source.connectedNodes.indexOf(target) < 0) source.connectedNodes.push(target)
      if (target.connectedNodes.indexOf(source) < 0) target.connectedNodes.push(source)
    });
  }

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
          if (nextNodes.indexOf(link.target) < 0 && link.target.x == node.x) {
            nextNodes.push(link.target);
          }
        });
      });
      if (nextNodes.length) {
        remainingNodes = nextNodes;
      } else {
        remainingNodes = sourceAndTargetNodesWithSameX();
      }
      ++x;
    }

    compressInXDirection()

    var minX = d3.min(nodes, function(d) { return d.x; });
    var maxX = d3.max(nodes, function(d) { return d.x; }) - minX;

    xScaleFactor = (size[0] - nodeWidth) / maxX
    scaleNodeXPositions(xScaleFactor);
  }

  function sourceAndTargetNodesWithSameX() {
    var nodeArray = []
    links.filter(function(link) {
      return link.target.x == link.source.x;
    }).forEach(function(link) {
      if (nodeArray.indexOf(link.target) < 0) {
        nodeArray.push(link.target)
      }
    });
    return nodeArray;
  }

  function computeLeftAndRightLinks() {
    var source, target;
    nodes.forEach(function(node) {
      node.rightLinks = [];
      node.leftLinks = [];
    });
    links.forEach(function(link) {
      source = link.source,
      target = link.target;
      if (source.x < target.x) {
        source.rightLinks.push(link);
        target.leftLinks.push(link);
        link.direction = 1
      } else {
        source.leftLinks.push(link);
        target.rightLinks.push(link);
        link.direction = -1
      }
    });
  }

  function moveSourcesRight() {
    nodes.forEach(function(node) {
      if (!node.targetLinks.length) {
        node.x = d3.min(node.sourceLinks, function(d) { return d.target.x; }) - 1;
      }
    });
  }

  function compressInXDirection() {
    var connectedNodesXPositions,
        nodesByXPosition = d3.nest()
          .key(function(d) { return d.x; })
          .sortKeys(d3.ascending)
          .entries(nodes)
          .map(function(d) { return d.values; });

    nodesByXPosition.forEach(function(xnodes) {
      xnodes.forEach(function(node) {
        connectedNodesXPositions = node.connectedNodes.map(function(d) { return d.x })
        // keep decrementing the x value of the node
        // unless it would have the same x value as one of its source or target nodes
        // or node.x is already 0
        while (node.x > 0 && connectedNodesXPositions.indexOf(node.x - 1) < 0) {
          node.x -= 1;
        }
      });
    });
  }

  function scaleNodeXPositions(kx) {
    nodes.forEach(function(node) {
      node.x *= kx;
    });
  }

  function adjustTop(minY) {
    nodes.forEach(function(node) {
      node.y -= minY
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

    var minY = d3.min(nodes, function(d) { return d.y; });
    adjustTop(minY);


    function initializeNodeYPosition() {
      var ky = d3.min(nodesByXPosition, function(nodes) {
        var linkSpacesCount = d3.sum(nodes, function(node) {
          return node.linkSpaceCount
        })

        var nodeValueSum = d3.sum(nodes, value);
        var discretionaryY = (size[1] - (nodes.length - 1) * nodePadding - linkSpacesCount * linkSpacing)

        return  discretionaryY / nodeValueSum;
      });

      // Fat links are those with lengths less than twice their heights
      // Fat links don't bend well
      // Test that ky is not so big that it causes "fat" links; adjust ky accordingly
      links.filter(function(link) {
        var linkLength = Math.abs(link.source.x - link.target.x)
        var linkHeight = link.value * ky;
        if (linkLength / linkHeight < 2) {
          ky = 0.5 * linkLength / link.value
        }
      });

      yScaleFactor = ky;

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
      nodesByXPosition.forEach(function(nodes) {
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
      node.rightLinks.sort(ascendingRightNodeYPosition);
      node.leftLinks.sort(ascendingLeftNodeYPosition);
    });

    nodes.forEach(function(node) {
      var ry = 0, ly = 0;

      node.rightLinks.forEach(function(link) {
        if (link.direction > 0) { link.sy = ry; }
        else { link.ty = ry; }
        ry += link.dy + linkSpacing;
      });

      node.leftLinks.forEach(function(link) {
        if (link.direction < 0) { link.sy = ly; }
        else { link.ty = ly; }
        ly += link.dy + linkSpacing;
      });

    });

    function ascendingLeftNodeYPosition(a, b) {
      var aLeftNode = (a.direction > 0) ? a.source : a.target
      var bLeftNode = (b.direction > 0) ? b.source : b.target
      return aLeftNode.y - bLeftNode.y;
    }

    function ascendingRightNodeYPosition(a, b) {
      var aRightNode = (a.direction > 0) ? a.target : a.source
      var bRightNode = (b.direction > 0) ? b.target : b.source
      return aRightNode.y - bRightNode.y;
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