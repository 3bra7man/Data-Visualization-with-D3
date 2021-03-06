
import { hierarchy, select, scaleLinear, scaleSqrt, scaleOrdinal, schemeCategory10, partition as d3Partition, arc as d3Arc, path as d3Path, interpolate } from 'd3';
import { useEffect } from "react"
import { fetchAndProcessDisplacementCategoryData } from '../../utils/fetchAndProcessDisplacementCategoryData';
import { showTooltip, hideTooltip } from '../../utils/tooltips';
import { formatNumber } from '../../utils/formatNumber';

const width = 360;
const height = 360;

function renderSunBurstChart() {

    const maxRadius = (Math.min(width, height) / 2) - 5;

    const x = scaleLinear()
                .range([0, 2 * Math.PI])
                .clamp(true);

    const y = scaleSqrt()
                 .range([maxRadius*.1, maxRadius]);

    const color = scaleOrdinal(schemeCategory10);

    const partition = d3Partition();

    const arc = d3Arc()
        .startAngle(d => x(d.x0))
        .endAngle(d => x(d.x1))
        .innerRadius(d => Math.max(0, y(d.y0)))
        .outerRadius(d => Math.max(0, y(d.y1)));

    const middleArcLine = d => {
        const halfPi = Math.PI/2;
        const angles = [x(d.x0) - halfPi, x(d.x1) - halfPi];
        const r = Math.max(0, (y(d.y0) + y(d.y1)) / 2);

        const middleAngle = (angles[1] + angles[0]) / 2;
        const invertDirection = middleAngle > 0 && middleAngle < Math.PI; // On lower quadrants write text ccw
        if (invertDirection) { angles.reverse(); }

        const path = d3Path();
        path.arc(0, 0, r, angles[0], angles[1], invertDirection);
        return path.toString();
    };

    const textFits = d => {
        const CHAR_SPACE = 6;

        const deltaAngle = x(d.x1) - x(d.x0);
        const r = Math.max(0, (y(d.y0) + y(d.y1)) / 2);
        const perimeter = r * deltaAngle;

        return d.data.name.length * CHAR_SPACE < perimeter;
    };

    const svg = select('.sunBurstChartWidgetWrapper').append('svg')
    .style('width', width)
    .style('height', height)
    .attr('viewBox', `${-width / 2} ${-height / 2} ${width} ${height}`)
    .on('click', () => focusOn()); // Reset zoom on canvas click

    fetchAndProcessDisplacementCategoryData().then(root => {
         
        root = hierarchy(root);
        root.sum(d => d.size);


        const slice = svg.selectAll('g.slice')
            .data(partition(root).descendants());

        slice.exit().remove();

        const newSlice = slice.enter()
            .append('g').attr('class', 'slice')
            .on('click', (event, d) => {
                event.stopPropagation();
                focusOn(d);
            });

        newSlice.append('path')
            .attr('class', 'main-arc')
            .style('fill', d => color((d.children ? d : d.parent).data.name))
            .attr('d', arc)
            .on('mousemove', (event, d) => {
                const tooltipText = `${d.data.name}: ${formatNumber(d.value)}`
                return showTooltip(event, tooltipText, "sunBurstChartTooltip")
            })
            .on('mouseout', () => hideTooltip("sunBurstChartTooltip"))

        newSlice.append('path')
            .attr('class', 'hidden-arc')
            .attr('id', (_, i) => `hiddenArc${i}`)
            .attr('d', middleArcLine);

        const text = newSlice.append('text')
            .attr('display', d => textFits(d) ? null : 'none');

        text.append('textPath')
            .attr('startOffset','50%')
            .attr('xlink:href', (_, i) => `#hiddenArc${i}` )
            .text(d => d.data.name);
    }).catch(error => {
        throw error;
    });


    function focusOn(d = { x0: 0, x1: 1, y0: 0, y1: 1 }) {
        // Reset to top-level if no data point specified

        const transition = svg.transition()
            .duration(750)
            .tween('scale', () => {
                const xd = interpolate(x.domain(), [d.x0, d.x1]),
                    yd = interpolate(y.domain(), [d.y0, 1]);
                return t => { x.domain(xd(t)); y.domain(yd(t)); };
            });

        transition.selectAll('path.main-arc')
            .attrTween('d', d => () => arc(d));

        transition.selectAll('path.hidden-arc')
            .attrTween('d', d => () => middleArcLine(d));

        transition.selectAll('text')
            .attrTween('display', d => () => textFits(d) ? null : 'none');

        moveStackToFront(d);

        function moveStackToFront(elD) {
            svg.selectAll('.slice').filter(d => d === elD)
                .each(function(d) {
                    this.parentNode.appendChild(this);
                    if (d.parent) { moveStackToFront(d.parent); }
                })
        }
    }

}

export const useSunBurstChart = () => {
    useEffect(() => {
        renderSunBurstChart();
    },[]);
}