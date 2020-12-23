import { useMapChart } from "./MapChart.hook";

export const MapChart = ({ selectedYear, setSelectedCountry, gdpData, countries }) => {
    useMapChart({ selectedYear, setSelectedCountry, gdpData, countries });
    return (
        <div className="widgetWithLegend">
            <div className="mapWidgetWrapper">
                <div id="mapChartTooltip" display="none" style={{
                    position: 'absolute',
                    display: 'none'
                }} />
                <svg id="map"/>
            </div>
        </div>
    );
}