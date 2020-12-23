import { useAppState } from './App.hook';
import { BarChart } from '../BarChart/BarChart';
import { TornadoChart } from '../TornadoChart/TornadoChart'
import { MapChart } from '../MapChart/MapChart';
import { SunBurstChart } from '../SunBurstChart/SunBurstChart';
import { SelectedCountry } from '../SelectedCountry/SelectedCountry';
import { YearSelect } from '../YearSelect/YearSelect';
import { Legend } from '../Legend/Legend';
import { schemeSpectral } from 'd3';

const spectral = schemeSpectral[4];

const legendItems = [
    {
      label: 'High Income',
      color: spectral[3]
    },
    {
        label: 'Middle High Income',
        color: spectral[2]
    },
    {
        label: 'Middle Income',
        color: spectral[1]
    },
    {
        label: 'Low Income',
        color: spectral[0]
    },
    {
        label: 'Unknown',
        color: 'var(--darkGrey)'
    }
];

function App() {
   const { 
    selectedCountryBarChartData, 
    selectedCountryTornadoChartData, 
    setSelectedCountry, 
    selectedCountry, 
    selectedYear,
    setSelectedYear,
    countriesData,
    gdpDataByYear
  } = useAppState();
  return (
    <div className="rootWrapper">
      <div className="upperWidgetsWrapper">
        <div className="headerWrapper">
          <div className="controlsWrapper">
            <SelectedCountry countryName={selectedCountry} />
            <YearSelect selectedYear={selectedYear} setSelectedYear={setSelectedYear} />
          </div>
          <div className="mapLegendWrapper"> 
            <Legend id="mapChartWidget" items={legendItems} />
          </div>
        </div>
        <MapChart setSelectedCountry={setSelectedCountry} selectedYear={selectedYear} countries={countriesData} gdpData={gdpDataByYear} />
      </div>
      <div className="lowerWidgetsWrapper">
        <BarChart data={selectedCountryBarChartData} />
        <TornadoChart data={selectedCountryTornadoChartData} />
        <SunBurstChart />
      </div>
    </div>
  );
}

export default App;
