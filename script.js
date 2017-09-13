var data = [];

for(var i=0; i<90; i++){
	data[i] = i+1;
}

data = d3.shuffle(data);

var barWidth = 20,
    height = 420;

// values used for the specific sort algorithm
var requiresSwap = false;
var numSorted = 0;
var currentPosition = 0;

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
	// each update should be a compare OR a swap
	// the bars involved with the current compare/swap should be coloured appropriately
	// all other bars should be coloured normally
	var t = d3.transition()
		.duration(750);
	if(requiresSwap){
		swapStep();
	} else {
		compareStep();
	}
}

function compareStep(){
	currentPosition++;
	if(currentPosition>=data.length){
		numSorted++;
		currentPosition = numSorted+1;
		if(numSorted<data.length){
			compareStep();
		}
	} else {
		requiresSwap = data[numSorted]<data[currentPosition];
	}
}

function swapStep(){
	requiresSwap = false;
	var temp = data[numSorted];
	data[numSorted] = data[currentPosition];
	data[currentPosition] = data[numSorted];
}

update();

d3.interval(update(), 1500000);