import { useState, useEffect } from 'react';
import { fetchAndProcessDisplacementData } from '../../utils/fetchAndProcessDisplacementData';
import { fetchAndProcessGDPData } from '../../utils/fetchAndProcessGDPData';
import { fetchAndProcessRefugeeData } from '../../utils/fetchAndProcessRefugeeData';
import { fetchCountries } from '../../utils/fetchCountries';

const processRefugeeData = (countryRefugeeData) => {
    return Object.values(countryRefugeeData).map(dataPoint => ({
        label: dataPoint.year,
        value: parseInt(dataPoint.total)
    })).sort((a, b) => {
        return parseInt(a.label) - parseInt(b.label);
    });
}

const processDisplacementData = (countryDisplacementData) => {
    const processedData = [];
    for(let data of countryDisplacementData) {
        const disasterDataPint = {
            label: data.year,
            value: parseInt(data.disaster_displacement)
        }
        const conflictDataPoint = {
            label: data.year,
            value: -parseInt(data.conflict_displacement)
        }
        processedData.push(disasterDataPint);
        processedData.push(conflictDataPoint);
    }
    return processedData;
}

export const useAppState = () => {
    const [selectedCountry, setSelectedCountry] = useState('Portugal');
    const [selectedYear, setSelectedYear] = useState(2019);
    const [refugeeData, setRefugeeData] = useState({});
    const [displacementData, setDisplacementData] = useState({});
    const [gdpData,setGdpData] = useState({});
    const [countriesData, setCountriesData] = useState([]);
    useEffect(() => {
        fetchAndProcessRefugeeData().then(refugeeData => setRefugeeData(refugeeData));
        fetchAndProcessDisplacementData().then(displacementData => setDisplacementData(displacementData));
        fetchAndProcessGDPData().then(gdpData => setGdpData(gdpData));
        fetchCountries().then(countriesData => setCountriesData(countriesData));
    }, []);
    const selectedCountryRefugeeData = refugeeData[selectedCountry] || {};
    const selectedCountryDisplacementData = displacementData[selectedCountry] || [];
    const selectedCountryBarChartData = processRefugeeData(selectedCountryRefugeeData);
    const selectedCountryTornadoChartData = processDisplacementData(selectedCountryDisplacementData);
    const gdpDataByYear = gdpData[selectedYear] || [];
    return {
        selectedCountry,
        setSelectedCountry,
        selectedYear,
        setSelectedYear,
        selectedCountryBarChartData,
        selectedCountryTornadoChartData,
        countriesData,
        gdpDataByYear
    }
}