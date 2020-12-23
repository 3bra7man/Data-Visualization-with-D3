import { scaleLinear, scaleBand, axisBottom, axisLeft, select, extent } from 'd3';
import { useEffect } from 'react';
import { showTooltip, hideTooltip } from '../../utils/tooltips';
import { formatNumber, formatNumberK } from '../../utils/formatNumber';

const margin = { top: 40, right: 40, bottom: 40, left: 40 };
const width = 400 - margin.left - margin.right;
const height = 400 - margin.top - margin.bottom;


function tornadoChart() {

    select("#tornadoChart").remove();

    const x = scaleLinear()
        .range([0, width]);
  
    const y = scaleBand()
        .rangeRound([0, height])
        .padding(0.1)
  
    const xAxis = axisBottom()
        .scale(x)
        .ticks(7)
  
    const yAxis = axisLeft()
        .scale(y)
        .tickSize(0)
  
    const svg = select(".tornadoChartWidgetWrapper").append("svg")
        .attr('id', 'tornadoChart')
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
  
    function renderTornadoChart(selection) {
      selection.each(function(data) {
        
        x.domain(extent(data, d => d.value)).nice();
        y.domain(data.map(d => d.label));
  
        const minValues = Math.min.apply(Math, data.map(function(o){return o.value;}))
        
        yAxis.tickPadding(Math.abs(x(minValues) - x(0)) + 10);
        xAxis.tickFormat((value) => formatNumberK(Math.abs(value)));
  
        const bar = svg.selectAll(".tornadoBar").data(data)
  
        bar.enter().append("rect")
            .attr("class", d => "tornadoBar --tornadoBar-" + (d.value < 0 ? "negative" : "positive"))
            .attr("x", d => x(Math.min(0, d.value)))
            .attr("y", d => y(d.label))
            .attr("width", d => Math.abs(x(d.value) - x(0)))
            .attr("height", y.bandwidth())
            .on('mousemove', (event, dataPoint) => {
                const tooltipLabel = dataPoint.value < 0 ? "Number of Conflict Displacements" : "Number of Disaster Displacements"
                const tooltipText = `${tooltipLabel} (in ${dataPoint.label}): ${formatNumber(Math.abs(dataPoint.value))}`
                return showTooltip(event, tooltipText, "barChartTooltip")
              })
            .on('mouseout', () => hideTooltip("barChartTooltip"))
            
  
        // bar.enter().append('text')
        //     .attr("text-anchor", "middle")
        //     .attr("x", (d,i) => x(Math.min(0, d.value)) + (Math.abs(x(d.value) - x(0)) / 2))
        //     .attr("y", (d, i) => y(d.label) + (y.bandwidth() / 2))
        //     .attr("dy", ".35em")
        //     .text((d) => Math.abs(d.value))
  
        svg.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + height + ")")
            .call(xAxis);
  
        svg.append("g")
            .attr("class", "y axis")
            .attr("transform", "translate(" + x(0) + ",0)")
            .call(yAxis);
      });
    }
  
    return renderTornadoChart;
}


export const useTornadoChart = ({ data }) => {
    useEffect(() => {
        if(data && data.length) {
            const chart = tornadoChart();
            select(".tornadoChartWidgetWrapper")
                .datum(data)
                .call(chart);
        }
    },[data]);
}