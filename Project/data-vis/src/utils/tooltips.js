export function showTooltip(evt, text, tooltipId) {
    let tooltip = document.getElementById(tooltipId);
    tooltip.innerHTML = text;
    tooltip.style.display = "block";
    tooltip.style.left = evt.pageX + 10 + 'px';
    tooltip.style.top = evt.pageY + 10 + 'px';
}
  
export function hideTooltip(tooltipId) {
    var tooltip = document.getElementById(tooltipId);
    tooltip.style.display = "none";
}