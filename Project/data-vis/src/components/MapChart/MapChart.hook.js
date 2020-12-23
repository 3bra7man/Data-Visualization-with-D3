import { useEffect } from "react";
import { select, geoPath, geoMercator, scaleOrdinal, schemeSpectral } from 'd3';
import { getEconomyBandByGDP } from '../../utils/getEconomyBandByGDP';
import { groupBy, isEmpty } from "ramda";
import { showTooltip, hideTooltip } from '../../utils/tooltips';
import { formatNumber } from '../../utils/formatNumber';

const width = 600;
const height = 400;

function getCountryLatestGDP(gdpData, country) {
    const groupByCountry = groupBy(({ country }) => country);
    const gdpDataByCountry = groupByCountry(gdpData);
    const countryName = country.properties.name;
    const countryGDPYears = gdpDataByCountry[countryName] || [];
    const countryGDPYear = countryGDPYears[0] || { gdp: '' };
    const countryGDP = countryGDPYear.gdp;
    return countryGDP;
} 


function renderMap({
    setSelectedCountry,
    countries,
    gdpData,
    selectedYear
}) {
    const svg = select('#map').attr('width', width).attr('height', height);
    const projection = geoMercator().scale(80).translate([width / 2, height / 1.4]);
    const path = geoPath(projection);
    const g = svg.append('g');
    const colorScale = scaleOrdinal([
        ...schemeSpectral[4],
        'var(--darkGrey)'
    ]);
    colorScale.domain(['Low Income', 'Middle Income', 'Upper Middle Income', 'High Income', 'Unknown'])
    g.selectAll('path').data(countries.features).enter().append('path')
                        .attr('class', 'country')
                        .attr('d', path)
                        .attr('fill', (country) => {
                            const countryGDP = getCountryLatestGDP(gdpData, country);
                            const countryEconomy = getEconomyBandByGDP(countryGDP);
                            return colorScale(countryEconomy);
                        })
                        .on('click', (_, country) => {
                            setSelectedCountry(country.properties.name)
                        })
                        .on('mousemove', (event, country) => {
                            const countryGDP = getCountryLatestGDP(gdpData, country);
                            const tooltipText = `${country.properties.name} — GDP (${selectedYear}): ${!!countryGDP ? `$${formatNumber(Math.round(parseInt(countryGDP)))}` : 'Unknown'}`
                            return showTooltip(event, tooltipText, "mapChartTooltip")
                        })
                        .on('mouseout', () => hideTooltip("mapChartTooltip"))
}

export const useMapChart = ({ countries, gdpData, selectedYear, setSelectedCountry }) => {
    useEffect(() => {
        if(!isEmpty(countries) && gdpData.length) {
            renderMap({
                countries,
                gdpData,
                setSelectedCountry,
                selectedYear
            });
        }
    }, [countries, gdpData, setSelectedCountry, selectedYear]);
}