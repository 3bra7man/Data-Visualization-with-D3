import { csv } from 'd3';
import { groupBy } from 'ramda';
import displacementCategoryData from '../data/data_displacement_category.csv';

export const fetchAndProcessDisplacementCategoryData = () => {
    return csv(displacementCategoryData).then(data => {
        const groupByCountry = groupBy(({ country }) => country);
        const groupByHazardCategory = groupBy(({ hazard_category }) => hazard_category);
        const groupByHazardType = groupBy(({ hazard_type }) => hazard_type);
        
        const dataGroupedByHazardCategory = groupByHazardCategory(data);
        const hazardCategories = Object.keys(dataGroupedByHazardCategory).map(key => ({
            name: key,
            children: dataGroupedByHazardCategory[key]
        }))
        
        const hazardCategoriesTypes = hazardCategories.map(category => {
            const dataGroupedByHazardType = groupByHazardType(category.children);
            const hazardTypes = Object.keys(dataGroupedByHazardType).map(key => ({
                name: key,
                children: dataGroupedByHazardType[key]
            }))
            return {
                ...category,
                children: hazardTypes
            }
        });

        const processedData = hazardCategoriesTypes.map(category => {
            return {
                ...category,
                children: category.children.map(type => {
                    const dataGroupedByCountry = groupByCountry(type.children);
                    const hazardCountries = Object.keys(dataGroupedByCountry).map(key => ({
                        name: key,
                        children: dataGroupedByCountry[key]
                    }))
                    const hazardCountriesByYear = hazardCountries.map(country => ({
                        ...country,
                        children: country.children.map(dataItem => ({
                            name: dataItem.year,
                            size: parseInt(dataItem.new_displacements)
                        }))
                    }))
                    return {
                        ...type,
                        children: hazardCountriesByYear
                    }
                })
            }
        })

        return {
            name: 'Displacement Category',
            children: processedData,
        };
    }).catch(error => {
        console.error(`Failed to load displacement data`, error);
        return {};
    })
}