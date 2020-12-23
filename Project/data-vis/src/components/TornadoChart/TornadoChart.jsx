import { useTornadoChart } from './useTornadoChart';
import { Legend } from '../Legend/Legend';

const legendItems = [
    {
      label: 'Number of Conflict Displacements (Per Year)',
      color: 'var(--blue4)'
    },
    {
        label: 'Number of Disaster Displacements (Per Year)',
        color: 'var(--blue3)'
    }
];

export const TornadoChart = ({ data = [] }) => {
    useTornadoChart({ data });
    if (data.length) {
        return (
            <div className="widgetWithLegend">
                <div className="tornadoChartWidgetWrapper">
                    <div id="tornadoChartTooltip" display="none" style={{
                        position: 'absolute',
                        display: 'none'
                    }} />
                </div>
                <Legend id="tornadoChartLegend" items={legendItems} />
            </div>
        );
    }
    return (
        <div className="emptyPlaceholder">
            <p>No data found for this country</p>
        </div>
    );
}