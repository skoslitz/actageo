  var height, lat, lon, path, projection, svg, width;

  width = 600;

  height = 600;

  lon = -121.0;

  lat = 23.6;

  projection = d3.geo.albers().center([0, lat]).rotate([lon, 0]).parallels([21.5, 25.5]).scale(9000).translate([width / 2, height / 2]);

  path = d3.geo.path().projection(projection);

  svg = d3.select("#map").append("svg").attr("width", width).attr("height", height);

  d3.json("data/taiwan.json", function(error, taiwan) {
    console.log('json geladen');
    var graticule;
    svg.selectAll(".taiwan").data(topojson.feature(taiwan, taiwan.objects.taiwan).features).enter().append("path").attr("class", function(d) {
      return "taiwan " + d.id;
    }).attr("d", path).on("mouseover", function(d) {
      return d3.select("#taiwanState").text(d.id).style("opacity", "1");
    }).on("mouseout", function(d) {
      return d3.select("#taiwanState").text("Region").style("opacity", "0.4");
    });
    graticule = d3.geo.graticule().step([0.5, 0.5]);
    return svg.append("path").datum(graticule).attr("d", path).attr("class", "graticule line");
  });


