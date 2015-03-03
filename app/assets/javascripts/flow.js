$(document).ready(function() {

  var margin = {top: 10, right: 10, bottom: 10, left: 10},
      width = 700 - margin.left - margin.right,
      height = 300 - margin.top - margin.bottom;

  var nodeDefaultOpacity = .9,
      nodeFadedOpacity = .1,
      nodeHighlightedOpacity = .5,
      linkDefaultOpacity = .5,
      linkFadedOpacity = .05,
      linkHighlightedOpacity = .9,
      positiveFlowColor = "#0066FF",
      negativeFlowColor = "#FF0000",
      linkColor = "#808080",
      transitionDelay = 50
      transitionDuration = 300;

  var units = "Widgets",
      formatNumber = function(d) {
        var numberFormat = d3.format(",.0f"); // zero decimal places
        return numberFormat(d) + " " + units;
      },
      formatFlow = function(d) {
        var flowFormat = d3.format("+,.0f"); // zero decimal places with sign
        return flowFormat(d) + " " + units;
      },
      color = d3.scale.category20();

  // append the svg canvas to the page
  var svg = d3.select("#chart").append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
    .append("g")
      .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");

  // group the links and nodes
  // so that one set can be drawn on top of the other
  svg.append("g").attr("id", "links")
  svg.append("g").attr("id", "nodes");

  // Set the sankey diagram properties
  var sankey = d3.sankey()
      .nodeWidth(36)
      .nodeSpacing(50)
      .linkSpacing(4)
      .arrowheadScaleFactor(0.5) // Specifies that 0.5 of the link's stroke width should be allowed for the marker at the end of the link.
      .size([width, height]);

  var path = sankey.link();

  var defs = svg.append("defs");

  var arrowHead = defs.append("marker")
      .attr("id", "arrowHead")
      .attr("viewBox", "0 0 6 10")
      .attr("refX", "1")
      .attr("refY", "5")
      .attr("markerUnits", "strokeWidth")
      .attr("markerWidth", "1")
      .attr("markerHeight", "1")
      .attr("orient", "auto")
      .style("fill", linkColor)
      .append("path")
        .attr("d", "M 0 0 L 3 0 L 6 5 L 3 10 L 0 10 z")

    var arrowHead = defs.append("marker")
      .attr("id", "arrowHeadNegativeFlow")
      .attr("viewBox", "0 0 6 10")
      .attr("refX", "1")
      .attr("refY", "5")
      .attr("markerUnits", "strokeWidth")
      .attr("markerWidth", "1")
      .attr("markerHeight", "1")
      .attr("orient", "auto")
      .style("fill", negativeFlowColor)
      .append("path")
        .attr("d", "M 0 0 L 3 0 L 6 5 L 3 10 L 0 10 z")

    var arrowHead = defs.append("marker")
        .attr("id", "arrowHeadPositiveFlow")
        .attr("viewBox", "0 0 6 10")
        .attr("refX", "1")
        .attr("refY", "5")
        .attr("markerUnits", "strokeWidth")
        .attr("markerWidth", "1")
        .attr("markerHeight", "1")
        .attr("orient", "auto")
        .style("fill", positiveFlowColor)
        .append("path")
          .attr("d", "M 0 0 L 3 0 L 6 5 L 3 10 L 0 10 z")

  function update() {

    // DATA JOIN
    var link = svg.select("#links").selectAll("path.link")
        .data(sankey.links(), function(d) { return d.id })

    // UPDATE ONLY
    link.transition()
        .delay(transitionDelay)
        .duration(transitionDuration)
        .style("stroke-width", function(d) { return Math.max(1, d.dy); })
        .attr("d", path)
        .style("opacity", linkDefaultOpacity)

    // EXIT
    link.exit().remove();

    // ENTER
    var linkEnter = link.enter().append("path")
        .attr("class", "link")
        .style("fill", "none")

    linkEnter.append("title")

    linkEnter.on('mouseenter', function(d){
        d3.select(this)
        .style("stroke", linkColor)
        .transition()
          .delay(transitionDelay)
          .duration(transitionDuration)
          .style("opacity", linkHighlightedOpacity)
      })

    linkEnter.on('mouseleave', function(d) {
        d3.select(this)
          .style("stroke", linkColor)
          .transition()
            .delay(transitionDelay)
            .duration(transitionDuration)
            .style("opacity", linkDefaultOpacity)
      });

    // ENTER + UPDATE
    linkEnter.sort(function(a, b) { return b.dy - a.dy; })
        .classed("leftToRight",function(d) {
          return d.direction > 0;
        })
        .classed("rightToLeft",function(d) {
          return d.direction < 0;
        })
        .style("marker-end", function(d) {
          return 'url(#arrowHead)'
        })
        .style("stroke", linkColor)
        .style("opacity", 0)
        .attr("d", path)
        .style("stroke-width", function(d) { return Math.max(1, d.dy); })
      .transition()
        .delay(transitionDelay + transitionDuration)
        .duration(transitionDuration)
        .style("opacity", linkDefaultOpacity)

    // set the titles
    link.select("title")
      .text(function(d) {
        if (d.direction > 0) {
          return d.source.name + " → " + d.target.name + "\n" + formatNumber(d.value);
        } else {
          return d.target.name + " ← " + d.source.name + "\n" + formatNumber(d.value);
        }
      });

    // DATA JOIN
    var node = svg.select("#nodes").selectAll(".node")
        .data(sankey.nodes(), function(d) { return d.id })

    // UPDATE ONLY

    // EXIT
    node.exit().remove();

    // ENTER
    var nodeEnter = node.enter().append("g").attr("class", "node")
    nodeEnter.append("title")
    nodeEnter.append("text")
    nodeEnter.append("rect")

    // fade in and out links and nodes that aren't connected to this node
    nodeEnter.on("mouseenter", function(g, i) {
        d3.select(this).select("rect")
          .style("fill", function(d) {
            return d.color = d.netFlow > 0 ? positiveFlowColor : negativeFlowColor;
          })
          .style("stroke", function(d) {
            return d3.rgb(d.color).darker(0.3);
          })
          .style("fill-opacity", nodeHighlightedOpacity);

        svg.selectAll(".link")
          .filter(function(d) { return d.source !== g && d.target !== g; })
            .style("marker-end", function(d) {
              return 'url(#arrowHead)'
            })
          .transition()
            .delay(transitionDelay)
            .duration(transitionDuration)
            .style("opacity", linkFadedOpacity);

        svg.selectAll(".link")
          .filter(function(d) { return d.source == g; })
            .style("marker-end", function(d) {
              return 'url(#arrowHeadNegativeFlow)'
            })
            .style("stroke", negativeFlowColor)
            .style("opacity", linkDefaultOpacity);

        svg.selectAll(".link")
          .filter(function(d) { return d.target == g; })
            .style("marker-end", function(d) {
              return 'url(#arrowHeadPositiveFlow)'
            })
            .style("stroke", positiveFlowColor)
            .style("opacity", linkDefaultOpacity);

        svg.selectAll(".node")
          .filter(function(d) {
            return (d.name == g.name) ? false : !sankey.connected(d, g)
          })
          .transition()
            .delay(transitionDelay)
            .duration(transitionDuration)
            .style("opacity", nodeFadedOpacity);
      })

    nodeEnter.on("mouseleave", function(g, i) {
        d3.select(this).select("rect")
          .style("fill", function(d) {
            return d.color = color(d.name.replace(/ .*/, ""))
          })
          .style("stroke", function(d) {
            return d3.rgb(color(d.name.replace(/ .*/, ""))).darker(0.3);
          })
          .style("fill-opacity", nodeDefaultOpacity);

        svg.selectAll(".link")
          .style("stroke", linkColor)
          .style("marker-end", function(d) {
            return 'url(#arrowHead)'
          })
          .transition()
            .delay(transitionDelay)
            .duration(transitionDuration)
            .style("opacity", linkDefaultOpacity);

        svg.selectAll(".node")
          .transition()
            .delay(transitionDelay)
            .duration(transitionDuration)
            .style("opacity", nodeDefaultOpacity);
      });


    // ENTER + UPDATE
    node.filter(function (d) { return d.children.length; })
      .on("dblclick", showHideChildren)

    node.transition()
      .delay(transitionDelay)
      .duration(transitionDuration)
      .attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; })

    node.select("title")
        .text(function(d) {
          var additionalInstructions = d.children.length ? "\n(Double click to expand)" : ""
          return d.name + "\nNet flow: " + formatFlow(d.netFlow) + additionalInstructions;
        });

    // allow nodes to be dragged to new positions
    node.call(d3.behavior.drag()
        .origin(function(d) { return d; })
        .on("dragstart", function() { this.parentNode.appendChild(this); })
        .on("drag", dragmove));

    // add in the text for the nodes
    node.filter(function(d) { return d.value !== 0; })
      .select("text")
        .attr("x", -6)
        .attr("y", function(d) { return d.dy / 2; })
        .attr("dy", ".35em")
        .attr("text-anchor", "end")
        .attr("transform", null)
        .text(function(d) { return d.name; })
      .filter(function(d) { return d.x < width / 2; })
        .attr("x", 6 + sankey.nodeWidth())
        .attr("text-anchor", "start");

    // add the rectangles for the nodes
    node.selectAll("rect")
        .style("fill", function(d) { return d.color = color(d.name.replace(/ .*/, "")); })
        .style("fill-opacity", nodeDefaultOpacity)
        .style("stroke", function(d) { return d3.rgb(color(d.name.replace(/ .*/, ""))).darker(0.3); })
        .style("stroke-opacity", "1")
        .style("stroke-width", "1px")
      .transition()
        .attr("height", function(d) { return d.dy; })
        .attr("width", sankey.nodeWidth());


    // the function for moving the nodes
    function dragmove(d) {
      d3.select(this).attr("transform",
        "translate(" + (
              d.x = Math.max(0, Math.min(width - d.dx, d3.event.x))
          )
          + "," + (
              d.y = Math.max(0, Math.min(height - d.dy, d3.event.y))
          ) + ")"
        );
      sankey.relayout();
      link.attr("d", path);
      svg.selectAll(".node").select("rect").attr("height", function(d) { return d.dy })
    }

    function showHideChildren(n) {
      n.children.forEach(function(child) {
        if (child.parent) {
          child._parent = child.parent;
          child.parent = null;
          child.visible = true;
        } else {
          child.parent = child._parent;
          child._parent = null;
          child.visible = false;
        }
      });

      sankey.expandAndCollapse()

      link.transition()
        .delay(transitionDelay)
        .duration(transitionDuration)
        .attr("d", path);

      node.selectAll("rect").transition()
        .delay(transitionDelay)
        .duration(transitionDuration)
        .attr("height", function(d) { return d.dy; })

      update();
    }

  }


  d3.json("sankey-formatted.json", function(error, graph) {
    sankey
      .nodes(graph.nodes)
      .links(graph.links)
      .initializeNodes(function(node) { node.visible = !node.parent })
      .layout(32);
    update();
  });

  setInterval(function() {
    d3.json("sankey-formatted.json", function(error, graph) {

      d3.selectAll('path.link')
        .interrupt() // interrupt current transition if any
        .transition() // preempt scheduled transitions if any
        .attr('pointer-events', 'none')

      d3.selectAll('.node')
        .interrupt() // interrupt current transition if any
        .transition() // preempt scheduled transitions if any
        .attr('pointer-events', 'none')

      setTimeout(function() {
        sankey
          .nodes(graph.nodes)
          .links(graph.links)
          .initializeNodes(function(node) { node.visible = !node.parent })
          .layout(32);
        update();
        svg.selectAll(".node").select("rect")
          .transition()
            .attr("height", function(d) { return d.dy })

        setTimeout(function() {
          d3.selectAll('path.link')
            .interrupt() // interrupt current transition if any
            .transition() // preempt scheduled transitions if any
            .attr('pointer-events', 'all')

          d3.selectAll('.node')
            .interrupt() // interrupt current transition if any
            .transition() // preempt scheduled transitions if any
            .attr('pointer-events', 'all')
        }, transitionDelay + transitionDuration + 200)
      }, transitionDelay + transitionDuration + 200)

    });
  }, 7000);

});