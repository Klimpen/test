var data = [];

for(var i=0; i<90; i++){
	data[i] = i+1;
}

data = d3.shuffle(data);

var barWidth = 20,
    height = 420;

// values used for the specific sort algorithm
var minValue = 0;
var currentPosition = 1;

var y = d3.scale.linear()
    .domain([0, d3.max(data)])
    .range([0, height]);

var chart = d3.select(".chart")
    .attr("width", barWidth * data.length)
    .attr("height", height);

var bar = chart.selectAll("g")
    .data(data)
  .enter().append("g")
    .attr("transform", function(d, i) { return "translate(" + i * barWidth + "," + (height-y(d)) + ")"; });

bar.append("rect")
    .attr("width", barWidth - 1)
    .attr("height", y);

function update(){
	// each update should be equal to a single compare
	// should color the two bars one way if a>b
	// should swap and colour differently again if b>a
	var t = d3.transition()
		.duration(750);
	compare();
	data.attr("class", "update")
		.transition(t);
}

function compare(){
	// implement whatever sort algorithm here
}

update();

d3.interval(update(), 1500000);