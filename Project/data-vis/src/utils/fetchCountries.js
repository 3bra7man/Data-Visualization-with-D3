import { json } from 'd3';
import { feature } from 'topojson';


export async function fetchCountries() {
    const countriesData = await json('/countries-110m.json')
    const countries = feature(countriesData, countriesData.objects.countries);
    return countries;
}