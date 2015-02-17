$(document).ready(function() {
  var units = "Widgets";

  var margin = {top: 10, right: 10, bottom: 10, left: 10},
      width = 700 - margin.left - margin.right,
      height = 300 - margin.top - margin.bottom;

  var nodeDefaultOpacity = .9,
      nodeFadedOpacity = .2,
      linkDefaultOpacity = .5,
      linkFadedOpacity = .1,
      linkHighlightedOpacity = .9

  var formatNumber = d3.format(",.0f"),    // zero decimal places
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

  // load the data
  d3.json("sankey-formatted.json", function(error, graph) {

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

    // add in the links
    var link = svg.append("g").selectAll(".link")
        .data(graph.links)
      .enter().append("path")
        .attr("class", "link")
        .attr("d", path)
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
        .style("stroke-width", function(d) { return Math.max(1, d.dy); })
        .style("opacity", linkDefaultOpacity)
        .sort(function(a, b) { return b.dy - a.dy; })
        .on('mouseover', function(d){
          d3.select(this).transition().style("opacity", linkHighlightedOpacity);
        })
        .on('mouseout', function(d) {
          d3.select(this).transition().style("opacity", linkDefaultOpacity);
        });

  // add the link titles
    link.append("title")
          .text(function(d) {
          return d.source.name + " → " +
                  d.target.name + "\n" + format(d.value); });

  // add in the nodes
    var node = svg.append("g").selectAll(".node")
        .data(graph.nodes)
      .enter().append("g")
        .attr("class", "node")
        .attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; })
      .call(d3.behavior.drag()
        .origin(function(d) { return d; })
        .on("dragstart", function() { this.parentNode.appendChild(this); })
        .on("drag", dragmove));

  // add the rectangles for the nodes
    node.append("rect")
        .attr("height", function(d) { return d.dy; })
        .attr("width", sankey.nodeWidth())
        .style("fill", function(d) { return d.color = color(d.name.replace(/ .*/, "")); })
        .style("fill-opacity", nodeDefaultOpacity)
        .style("stroke", function(d) { return d3.rgb(d.color).darker(0.3); })
      .append("title")
        .text(function(d) { return d.name + "\n" + format(d.value); });

  // add in the title for the nodes
    node.append("text")
        .attr("x", -6)
        .attr("y", function(d) { return d.dy / 2; })
        .attr("dy", ".35em")
        .attr("text-anchor", "end")
        .attr("transform", null)
        .text(function(d) { return d.name; })
      .filter(function(d) { return d.x < width / 2; })
        .attr("x", 6 + sankey.nodeWidth())
        .attr("text-anchor", "start");

    // fade in and out links and nodes that aren't connected to this node
    node
      .on("mouseover", fade(linkFadedOpacity, nodeFadedOpacity))
      .on("mouseout", fade(linkDefaultOpacity, nodeDefaultOpacity));


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
  });
});