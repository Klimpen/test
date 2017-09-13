var data = [];

for(var i=0; i<90; i++){
    data[i] = i+1;
}

data = d3.shuffle(data);

const padding = 10; // TODO Do this with css eventually
const barWidth = (window.innerWidth - padding) / data.length;
const height = 420;

// values used for the specific sort algorithm
const minValue = 0;
const requiresSwap = false;
const numSorted = 0;
let currentPosition = 0;

const y = d3.scale.linear()
    .domain([0, d3.max(data)])
    .range([0, height]);

const chart = d3.select(".chart")
    .attr("width", barWidth * data.length)
    .attr("height", height);

const bar = chart.selectAll("g")
    .data(data)
    .enter().append("g")
        .attr("transform", function(d, i) {
            return "translate(" + i * barWidth + "," + (height-y(d)) + ")";
        })


function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}

const rect = bar.append("rect")
    .attr("width", barWidth - 1)
    .attr("height", y)

function update(){
    const compare_top = getRandomInt(0, data.length); // TODO initialize from compare() somehow
    const compare_bot = getRandomInt(0, data.length);
    rect.style('fill', (d, i) => {
        if (i == compare_top) return 'salmon';
        if (i == compare_bot) return 'seagreen';
        return 'cornflowerblue';
    })
    // each update should be equal to a single compare
    // should color the two bars one way if a>b
    // should swap and colour differently again if b>a

    // compare();

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
	const temp = data[numSorted];
	data[numSorted] = data[currentPosition];
	data[currentPosition] = data[numSorted];
}

update();

setInterval(update, 0.3*1000);
