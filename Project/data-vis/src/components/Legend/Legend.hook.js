import { useEffect } from "react"
import { select } from 'd3';


const renderLegendItem = (svg, item, i) => {
    svg.append("circle").attr("cx",100).attr("cy",30 * (i + 1)).attr("r", 6).style("fill", item.color);
    svg.append("text").attr("x", 120).attr("y", (30 * (i + 1))).text(item.label).style("font-size", "15px").attr("alignment-baseline","middle");
}


const renderLegend = ({ id, items }) => {
    const svg = select(`#${id}`);
    items.forEach((item, i) => {
      renderLegendItem(svg, item, i);
    })
    // svg.append("circle").attr("cx",100).attr("cy",30).attr("r", 6).style("fill", "#69b3a2")
    // svg.append("circle").attr("cx",100).attr("cy",60).attr("r", 6).style("fill", "#404080")
    // svg.append("text").attr("x", 120).attr("y", 30).text("variable A").style("font-size", "15px").attr("alignment-baseline","middle")
    // svg.append("text").attr("x", 120).attr("y", 60).text("variable B").style("font-size", "15px").attr("alignment-baseline","middle")
}

export const useLegend = ({ id, items }) => {
    useEffect(() => {
        renderLegend({ id, items });
    },[id, items]);
}