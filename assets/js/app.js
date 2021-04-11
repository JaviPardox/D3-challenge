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

// X axis 

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

// X axis text

xText
    .append("text")
    .attr("y", -26)
    .attr("data-name", "poverty")
    .attr("data-axis", "x")
    .attr("class", "aText active x")
    .text("In Poverty (%)")

xText
    .append("text")
    .attr("y", 0)
    .attr("data-name", "age")
    .attr("data-axis", "x")
    .attr("class", "aText inactive x")
    .text("Age (Median)")

xText
    .append("text")
    .attr("y", 26)
    .attr("data-name", "income")
    .attr("data-axis", "x")
    .attr("class", "aText inactive x")
    .text("Household Income (Median)")

// Y axis

var leftTextX = margin + tPadLeft;
var leftTextY = (height + labelArea) / 2 - labelArea;

svg.append("g").attr("class", "yText");

var yText = d3.select(".yText");

function yTextUpdate(){
    yText.attr("transform", `translate(${leftTextX}, ${leftTextY}) rotate(-90)`)
}

yTextUpdate();

yText
    .append("text")
    .attr("y", -26)
    .attr("data-name", "income")
    .attr("data-axis", "y")
    .attr("class", "aText active y")
    .text("Obesity (%)")

yText
    .append("text")
    .attr("y", 0)
    .attr("data-name", "smokes")
    .attr("data-axis", "y")
    .attr("class", "aText inactive y")
    .text("Smokes (%)")

yText
    .append("text")
    .attr("y", 26)
    .attr("data-name", "healthcare")
    .attr("data-axis", "y")
    .attr("class", "aText inactive y")
    .text("Lack Healthcare (%)")