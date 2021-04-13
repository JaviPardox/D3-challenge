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

    
// Import data 
d3.csv("assets/data/data.csv").then(function(data){
    console.log(data);
    visualize(data);
})

// Create function to visualize
function visualize(data){
    var curX = "poverty";
    var curY = "obesity";

    var xMin;
    var xMax;
    var yMin;
    var yMax;

    var toolTip = d3
        .tip()
        .attr("class", "d3-tip")
        .offset([40, -60])
        .html(function(d){
            var theX;
            var theState = `<div>${d.state}</div>`;
            var theY = `<div>${curY}:${d[curY]}%</div>`;
            
            if(curX === "poverty"){
                theX = `<div> ${curX}: ${d[curX]}%</div>`
            }

            else{
                theX = `<div> ${curX}: ${parseFloat(d[curX]).toLocaleString("en")}</div>`
            }

            return theState + theX + theY;
        })
    
    svg.call(toolTip);

    function xMinMax(){
        xMin = d3.min(data, function(d){
            return parseFloat(d[curX]) * 0.90;
        })

        xMax = d3.max(data, function(d){
            return parseFloat(d[curX]) * 1.10;
        })
    }

    function yMinMax(){
        yMin = d3.min(data, function(d){
            return parseFloat(d[curY]) * 0.90;
        })

        yMax = d3.max(data, function(d){
            return parseFloat(d[curY]) * 1.10;
        })
    }

    // Change classes and appearances of label text when clicked
    function labelChange(axis, clicked){
        d3.selectAll(".aText")
        .filter("." + axis)
        .filter(".active")
        .classed("active", false)
        .classed("inactive", true);

        clickedText.classed("inactive", false).classed("active", true);
    }

    // First grab min and max values of x and y
    xMinMax();
    yMinMax();

    var xScale = d3
        .scaleLinear()
        .domain([xMin, xMax])
        .range([margin + labelArea, width - margin])
    var yScale = d3
        .scaleLinear()
        .domain([yMin, yMax])
        .range([height - margin - labelArea, margin])

    var xAxis = d3.axisBottom(xScale);
    var yAxis = d3.axisLeft(yScale);

    function tickCount(){
        if(width <= 500){
            xAxis.ticks(5);
            yAxis.ticks(5);
        }
        else{
            xAxis.ticks(10);
            yAxis.ticks(10);
        }
    }

    tickCount();

    svg
        .append("g")
        .call(xAxis)
        .attr("class", "xAxis")
        .attr("transform", `translate(0, ${height - margin - labelArea})`)
    
    svg
        .append("g")
        .call(yAxis)
        .attr("class", "yAxis")
        .attr("transform", `translate(${margin + labelArea}, 0)`)
}