import { csv } from 'd3';
import { groupBy } from 'ramda';
import gdpData from '../data/data_gdp.csv';

export const fetchAndProcessGDPData = (selectedYear) => {
    return csv(gdpData).then(data => {
        const groupByYear = groupBy(({ year }) => year);
        return groupByYear(data);
        // return data.filter(dataPoint => parseInt(dataPoint.year) === selectedYear);
    }).catch(error => {
        console.error(`Failed to load GDP data`, error);
        return {};
    });
}