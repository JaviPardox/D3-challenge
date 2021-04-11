// Section 1 Pre-Data Setup

// Graph space section

// Grab the width of the containing box
// parseInt gets the integer from a string
var width = parseInt(d3.select("#scatter").style("width"));
console.log(width);

// Designate the height of the graph
var height = width - width / 3.9;
console.log(height);

var margin = 20;

// Spacing for placing words
var labelArea = 110;

// Padding for the text at the bottom and left axes
var tPadBot = 40;
var tPadLeft = 40;

var svg = d3
    .select("#scatter")
    .append("svg")
    .attr("width", width)
    .attr("height", height)
    .attr("class", "chart")