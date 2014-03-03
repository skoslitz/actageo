$(document).ready(function() {
var width = 600,
    height = 600;

var lon = -138.0;
var lat = 36;

var rateById = d3.map();

var quantize = d3.scale.threshold()
.domain([143, 692, 18700])
.range(d3.range(4).map(function(i) {  return "q" + i + "-4";  }));

var projection = d3.geo.albers()
.center([0, lat])
.rotate([lon, 0])
.parallels([23, 46])
.scale(1700).translate([width / 2, height / 2]);

var path = d3.geo.path().projection(projection);

var svg = d3.select("#map").append("svg")
.attr("width", width)
.attr("height", height);


queue()
    .defer(d3.json, "data/japan.json")
    .defer(d3.tsv, "data/japanTea.tsv", function(d) { rateById.set(d.id, +d.GrowingArea); })
    .await(ready);

function ready(error, japan) {
  svg.append("g")
      .attr("class", "japan")
    .selectAll("path")
      .data(topojson.feature(japan, japan.objects.japan).features)
    .enter().append("path")
      .attr("class", function(d) { return quantize(rateById.get(d.properties.NAME_1)); })
      .attr("d", path)
      .attr("d", path).on("mouseover", function(d) {
      return d3.select("#japanState").text(d.properties.NAME_1).style("opacity", "1");
    }).on("mouseout", function(d) {
      return d3.select("#japanState").text("Region").style("opacity", "0.4");
    });

}
});