import { csv } from 'd3';
import { groupBy } from 'ramda';
import displacementData from '../data/data_displacement_compare.csv'

export const fetchAndProcessDisplacementData = () => {
    return csv(displacementData).then(data => {
        const groupByCountry = groupBy(({ country }) => country);
        return groupByCountry(data);
    }).catch(error => {
        console.error(`Failed to load displacement data`, error);
        return {};
    })
}