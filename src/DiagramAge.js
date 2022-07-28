import { Component } from "react";
import * as d3 from 'd3';
class DiagramAge extends Component{
    constructor(props){
        super(props)
        this.drawDiagramAge = this.drawDiagramAge.bind(this);
    }
    componentDidMount(){
        this.drawDiagramAge();
    }
    drawDiagramAge(){
        const margin = {top: 20, right: 10, bottom: 60 , left: 50},
        width = 400 - margin.left - margin.right,
        height = 200 - margin.top - margin.bottom;
        const svg = d3.select("#my_dataviz")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);
        d3.json("https://storage.googleapis.com/ot-test-data/recruiting_challenge_frontend.geojson").then(function(data) {
            const tooltip = d3.select("body")
            .append("div")
            .attr("class","d3-tooltip")
            .style("position", "absolute")
            .style("z-index", "10")
            .style("visibility", "hidden")
            .style("color", "#fff")
            .text("a simple tooltip");
            const x = d3.scaleBand()
            .range([ 0, width ])
            .domain(data.features.map(d =>d.properties.id))
            .padding(0.2);

            svg.append("g")
            .attr("transform", `translate(0, ${height})`)
            .call(d3.axisBottom(x))
            .selectAll("text")
            .attr("transform", "translate(-10,0)rotate(-45)")
            .style("text-anchor", "end");

            const y = d3.scaleLinear()
            .domain([0, 2700])
            .range([ height, 0]);
            svg.append("g")
            .call(d3.axisLeft(y));
            svg.selectAll("mybar")
            .data(data.features)
            .join("rect")
            .attr("x", d => x(d.properties.id))
            .attr("y", d => y(d.properties.age))
            .attr("width", x.bandwidth())
            .attr("height", d => height - y(d.properties.age))
            .attr("fill", "#69b3a2")
            .on("mouseover", function(d, i) {
                tooltip.html(
                    i.properties.age + " minutes old").style("visibility", "visible");
              })
              .on("mousemove", function(event){
                tooltip
                  .style("top", (event.pageY-10)+"px")
                  .style("left",(event.pageX+10)+"px");
              })
              .on("mouseout", function() {
                tooltip.html(``).style("visibility", "hidden");
                d3.select(this).attr("fill", "#69b3a2");
              });
            svg.append("text")
                .attr("text-anchor", "end")
                .attr("transform", "rotate(-90)")
                .attr("y", -35)
                .attr("x", -50)
                .style("fill","white")
                .style("font-size","16")
                .style("font-family","sans-serif")
                .text("Age");  
            svg.append("text")
                .attr("text-anchor", "end")
                .attr("y", 179)
                .attr("x", width/2)
                .style("fill","white")
                .style("font-size","16")
                .style("font-family","sans-serif")
                .text("Clusters");        
        })
    }
    render(){
        return (<div id="my_dataviz"></div>);
    }
}

export default DiagramAge;