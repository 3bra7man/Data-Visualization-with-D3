export const getEconomyBandByGDP = (gdp) => {
    const parsedGDP = Math.round(parseInt(gdp));
    if(parsedGDP < 1026) {
        return 'Low Income'
    } else if(1026 < parsedGDP && parsedGDP < 3995) {
        return "Middle Income"
    } else if(3995 < parsedGDP && parsedGDP < 12375) {
        return "Upper Middle Income"
    } else if(parsedGDP) {
        return "High Income";
    } else {
        return "Unknown";
    }
}