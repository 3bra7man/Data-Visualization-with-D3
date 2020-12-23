import { csv } from 'd3';
import { groupBy } from 'ramda';
import refugeeData from '../data/data_refugee.csv';

export const fetchAndProcessRefugeeData = () => {
    return csv(refugeeData).then(data => {
      const groupByCountry = groupBy(({ country }) => country);
      return groupByCountry(data);
    }).catch(error => {
       console.error(`Failed to load refugee data`, error);
       return {};
    });
}