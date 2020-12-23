import { useEffect } from 'react';
import { select, scaleLinear, axisLeft, scaleBand, axisBottom, max } from 'd3';
import { showTooltip, hideTooltip } from '../../utils/tooltips';
import { formatNumber, formatNumberK } from '../../utils/formatNumber';

const margin = { top: 40, right: 40, bottom: 40, left: 40 };
const width = 400 - margin.left - margin.right;
const height = 400 - margin.top - margin.bottom;

function renderBarChart(data) {

    select("#barChart").remove();

    // Select the svg object
    // append a 'group' element to 'svg'
    // moves the 'group' element to the top left margin
    const svg = select(".barChartWidgetWrapper").append('svg')
      .attr('id', 'barChart')
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    // set the ranges
    const x = scaleBand().range([0, width]).padding(0.1);

    const y = scaleLinear().range([height, 0]);

    // Scale the range of the data in the domains
    x.domain(data.map( (d) => d.label));
    y.domain([0, max(data, (d) => d.value)]);

    // Append the rectangles for the bar chart
    svg.selectAll(".bar")
      .data(data)
      .enter().append("rect")
        .attr("class", "bar")
        .attr("x", (d) =>   x(d.label))
        .attr("width", x.bandwidth())
        .attr("y", (d) => y(d.value))
        .attr("height", (d) =>  height - y(d.value))
        .on('mousemove', (event, dataPoint) => {
          const tooltipText = `Number of Outgoing Refugees (in ${dataPoint.label}): ${formatNumber(dataPoint.value)}`
          return showTooltip(event, tooltipText, "barChartTooltip")
        })
        .on('mouseout', () => hideTooltip("barChartTooltip"))

    // Add the x Axis
    svg.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(axisBottom(x));

    const yAxis = axisLeft(y);
    yAxis.tickFormat((value) => formatNumberK(value));

    // Add the y Axis
    svg.append("g").call(yAxis);
}

export const useBarChart = ({ data }) => {
  useEffect(() => {
    if(data && data.length) {
      renderBarChart(data);
    }
  }, [data]);
};
