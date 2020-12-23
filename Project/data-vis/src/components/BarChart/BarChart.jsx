import { useBarChart } from './BarChart.hook';
import { Legend } from '../Legend/Legend'


const legendItems = [
    {
      label: 'Number of Outgoing Refugees (Per Year)',
      color: 'var(--blue1)'
    }
];

export const BarChart = ({ data = [] }) => {
    useBarChart({ data });
    if(data.length) {
      return (
        <div className="widgetWithLegend">
          <div className="barChartWidgetWrapper">
              <div id="barChartTooltip" display="none" style={{
                    position: 'absolute',
                    display: 'none'
                }} />
          </div>
          <Legend id="barChartLegend" items={legendItems} />
        </div>
      );
    } 
    return (
      <div className="emptyPlaceholder">
        <p>No data found for this country</p>
      </div>
    );
}