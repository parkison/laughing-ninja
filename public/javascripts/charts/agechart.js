charts.agechart = function() {
  // basic data
  var margin = {top: 20, right: 20, bottom: 30, left: 40},
      width = 400
      height = 100
   
  var svg;
  var container;
  var theBars;
  var maxAge = 50;

  function name(d) {
    return d._id;
  }

  var drag = d3.behavior.drag()
    .origin(function() { 
           var t = d3.select(this);
           return {height: t.attr("height"), y: t.attr("y")};
       })
    .on("drag", function(d,i) {
      if((height-d3.event.y)>5){
          d3.select(this)
          .attr("y", d3.event.y)
          .attr("height",height-d3.event.y)

          this.__data__.age = parseInt(maxAge-maxAge*d3.event.y/height);
          $scope.$apply()
        }

      
    });

  function render(selection) {
    var dataout = [];

    selection.each(function(data) {
      // setup the basics
      var w = width - margin.left - margin.right,
          h = height - margin.top - margin.bottom;
      
      // console.log('comment:' + data);
      // var x = d3.scale.linear().domain([0, 4]).range([0, w]);
      var x = d3.scale.ordinal()
          .rangeRoundBands([0, width], .1);

      var y = d3.scale.linear()
          .range([height, 0]);

      var xAxis = d3.svg.axis()
          .scale(x)
          .orient("bottom");

      var yAxis = d3.svg.axis()
          .scale(y)
          .orient("left")
          
      if (!svg) {
        svg = d3.select("body").append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
          .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        svg.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + height + ")")

        svg.append("g")
            .attr("class", "y axis")
            .append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", 6)
            .attr("dy", ".71em")
            .style("text-anchor", "end")
            .text("Age");

            console.log("Initialize Chart") 
      }

      theBars = svg.selectAll(".bar").data(data,name);

      x.domain(data.map(function(d) { return d.first+" "+d.last; }));
      // y.domain([0, d3.max(data, function(d) { return d.age; })]);
      y.domain([0, maxAge]);

      var yRev = d3.scale.linear()
          .range([d3.max(data, function(d) { return d.age; }), 0]);

      yRev.domain([height,0]);

      d3.select(".x.axis").transition().duration(500).call(xAxis)
      d3.select(".y.axis").call(yAxis)
        

      //Add the Enter Bars
      theBars.enter().append("rect")

      //Move and Resize Update and Enter Bars
      theBars.transition().duration(500).attr("class", "bar")
            .attr("x", function(d) { return x(d.first+" "+d.last); })
            .attr("width", x.rangeBand())
            .attr("y", function(d) { return y(d.age); })
            .attr("height", function(d) { return height - y(d.age); })
    
      theBars.call(drag);

      //Remove Exit Bars
      theBars.exit().remove()

    });
  }


  // basic data
  render.margin = function(_) {
    if (!arguments.length) return margin;
    margin = _;
    return render;
  };
  render.width = function(_) {
    if (!arguments.length) return width;
    width = _;
    return render;
  };
  render.height = function(_) {
    if (!arguments.length) return height;
    height = _;
    return render;
  };

  // accessors
  render.xValue = function(_) {
    if (!arguments.length) return xValue;
    xValue = _;
    return render;
  };
  render.yValue = function(_) {
    if (!arguments.length) return yValue;
    yValue = _;
    return render;
  };

  render.x = function(_) {
    if (!arguments.length) return x;
    x = _;
    return render;
  };
  render.y = function(_) {
    if (!arguments.length) return y;
    y = _;
    return render;
  };

  return render;
};