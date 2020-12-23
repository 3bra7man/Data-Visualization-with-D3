import { useSunBurstChart } from "./SunBurstChart.hook"

export const SunBurstChart = () => {
    useSunBurstChart();
    return (
        <div className="widgetWithLegend">
            <div className="sunBurstChartWidgetWrapper">
                <div id="sunBurstChartTooltip" display="none" style={{
                            position: 'absolute',
                            display: 'none'
                }} />
            </div>
        </div>

    );
}