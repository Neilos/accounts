$(document).ready(function() {

  var margin = {top: 10, right: 10, bottom: 10, left: 10},
      width = 700 - margin.left - margin.right,
      height = 300 - margin.top - margin.bottom;

  var nodeDefaultOpacity = .9,
      nodeFadedOpacity = .2,
      linkDefaultOpacity = .5,
      linkFadedOpacity = .1,
      linkHighlightedOpacity = .9

  var formatNumber = d3.format(",.0f"),    // zero decimal places
      units = "Widgets",
      format = function(d) { return formatNumber(d) + " " + units; },
      color = d3.scale.category20();

  // append the svg canvas to the page
  var svg = d3.select("#chart").append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
    .append("g")
      .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");

  // Set the sankey diagram properties
  var sankey = d3.sankey()
      .nodeWidth(36)
      .nodePadding(40)
      .linkSpacing(4)
      .arrowheadScaleFactor(0.5)
      .size([width, height]);

  var path = sankey.link();

  var defs = svg.append("defs");

  var arrowHeadRight = defs.append("marker")
      .attr("id", "arrowHeadRight")
      .attr("viewBox", "0 0 5 10")
      .attr("refX", "0.1")
      .attr("refY", "5")
      .attr("markerUnits", "strokeWidth")
      .attr("markerWidth", "1")
      .attr("markerHeight", "1")
      .attr("orient", "auto")
      .append("path")
        .attr("d", "M 0 0 L 5 5 L 0 10 z")

  var arrowHeadLeft = defs.append("marker")
      .attr("id", "arrowHeadLeft")
      .attr("viewBox", "0 0 5 10")
      .attr("refX", "-0.1")
      .attr("refY", "5")
      .attr("markerUnits", "strokeWidth")
      .attr("markerWidth", "1")
      .attr("markerHeight", "1")
      .attr("orient", "auto")
      .append("path")
        .attr("d", "M 5 0 L 0 5 L 5 10 z")

  function update(graph) {

    // filter out links that go nowhere
    graph.links = graph.links.filter(function(link) {
      return link.source !== link.target;
    });

    // resolve bidirectional relationships into node links with a direction
    relationships = {};
    graph.links.forEach(function(link){
      var sourceTarget = link["source"] + "-" + link["target"];
      var targetSource = link["target"] + "-" + link["source"];
      if (relationships[sourceTarget] !== undefined) {
        link.direction = relationships[sourceTarget];
      } else if (relationships[targetSource] !== undefined) {
        link.direction = -relationships[targetSource];
        var tempSource = link.source;
        link.source = link.target;
        link.target = tempSource;
      } else {
        link.direction = 1;
      }
      relationships[sourceTarget] = link.direction;
    });

    sankey
      .nodes(graph.nodes)
      .links(graph.links)
      .layout(32);

    // DATA JOIN
    var link = svg.selectAll("path.link")
        .data(graph.links, function(d) { return d.id })

    // UPDATE
    link.attr("class", "link update")

    // ENTER
    link.enter().append("path")
        .attr("class", "link enter")
        .append("title")

    // ENTER + UPDATE
    link.sort(function(a, b) { return b.dy - a.dy; })
        .style("marker-end", function(d) {
          if (d.direction > 0) {
            return 'url(#arrowHeadRight)'
          }
        })
        .style("marker-start", function(d) {
          if (d.direction < 0) {
            return 'url(#arrowHeadLeft)'
          }
        })
        .style("opacity", linkDefaultOpacity)
      .transition()
        .attr("d", path)
        .style("stroke-width", function(d) { return Math.max(1, d.dy); })

    // set the titles
    link.select("title")
        .text(function(d) {
          var arrow = (d.direction > 0) ? " → " : " ← "
          return d.source.name + arrow +
                 d.target.name + "\n" + format(d.value);
        });

    // highlight links on hover
    link
      .on('mouseover', function(d){
        d3.select(this).transition().style("opacity", linkHighlightedOpacity);
      })
      .on('mouseout', function(d) {
        d3.select(this).transition().style("opacity", linkDefaultOpacity);
      });

    // EXIT
    link.exit().remove();


    // DATA JOIN
    var node = svg.selectAll(".node")
        .data(graph.nodes, function(d) { return d.id })

    // UPDATE
    node.attr("class", "node update")
      .transition()
        .attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; })

    // ENTER
    var nodeEnter = node.enter().append("g")
      .attr("class", "node enter")
      .attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; })
    nodeEnter.append("title")
    nodeEnter.append("text")
    nodeEnter.append("rect")

    // ENTER + UPDATE
    node.select("title")
        .text(function(d) { return d.name + "\n" + format(d.value); });

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
    node.select("rect")
        .style("fill", function(d) { return d.color = color(d.name.replace(/ .*/, "")); })
        .style("fill-opacity", nodeDefaultOpacity)
        .style("stroke", function(d) { return d3.rgb(d.color).darker(0.3); })
      .transition()
        .attr("height", function(d) { return d.dy; })
        .attr("width", sankey.nodeWidth())

    // allow nodes to be dragged to new positions
    node.call(d3.behavior.drag()
        .origin(function(d) { return d; })
        .on("dragstart", function() { this.parentNode.appendChild(this); })
        .on("drag", dragmove));

    // fade in and out links and nodes that aren't connected to this node
    node
      .on("mouseover", fade(linkFadedOpacity, nodeFadedOpacity))
      .on("mouseout", fade(linkDefaultOpacity, nodeDefaultOpacity));

    // EXIT
    node.exit().remove();


    // Returns an event handler for fading
    function fade(linkOpacity, nodeOpacity) {
      return function(g, i) {
        svg.selectAll(".link")
          .filter(function(d) {
            return (d.source != g && d.target != g);
          })
          .transition().style("opacity", linkOpacity);
        svg.selectAll(".node")
          .filter(function(d) {
            return (d.name == g.name) ? false : !sankey.connected(d, g)
          })
          .transition().style("opacity", nodeOpacity);
      };
    }

    // the function for moving the nodes
    function dragmove(d) {
      d3.select(this).attr("transform",
          "translate("
          + ( d.x = d.x )
          + "," + (
              d.y = Math.max(0, Math.min(height - d.dy, d3.event.y))
          )
          + ")");
      sankey.relayout();
      link.attr("d", path);
    }

  }

  d3.json("sankey-formatted.json", function(error, graph) {
    update(graph)
  });

  // setInterval(function() {
  //   d3.json("sankey-formatted.json", function(error, graph) {
  //     update(graph)
  //   });
  // }, 2000);

});