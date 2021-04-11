// Section 1 Pre-Data Setup

// Graph space section

// Grab the width of the containing box
// parseInt gets the integer from a string
var width = parseInt(d3.select("#scatter").style("width"));
//console.log(width);

// Designate the height of the graph
var height = width - width / 3.9;
//console.log(height);

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
    .attr("class", "chart");

var radius ;

// This function updates the radius of the circle depending on the dimension of the window
function radiusUpdate(){
    if(width <= 530){
        radius = 5;
    }
    else{
        radius = 10;
    }
}

radiusUpdate();

// New element 
svg.append("g").attr("class", "xText");

// Dot notation will select all elements of class xText
var xText = d3.select(".xText");

// Dynamically update g.xText element
function xTextUpdate(){
    xText.attr(
        "transform",
        "translate(" +
        ((width - labelArea) / 2 + labelArea) +
        ", " +
        (height - margin - tPadBot) +
        ")"
    )
};

xTextUpdate()

xText
    .append("text")
    .attr("y", -26)
    .attr("data-name", "poverty")
    .attr("data-axis", "x")
    .attr("class", "aText active x")
    .text("In Poverty (%)")