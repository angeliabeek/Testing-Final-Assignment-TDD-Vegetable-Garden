const getYieldForPlant = (corn, factor) => {
    const maxYield = corn.yield;
    const maxYieldPercentage = 100;

    if (!factor) {
        return maxYield;
    }
    else if (factor.sun === "low" && factor.wind === "medium") {
        const sunLowGrowPercentage = corn.factor.sun.low;
        const sunLowGrowFactor = 1 + (sunLowGrowPercentage / maxYieldPercentage);

        const windMediumGrowPercentage = corn.factor.wind.medium;
        const windMediumGrowFactor = 1 + (windMediumGrowPercentage / maxYieldPercentage);

        const cornYield = Math.round(maxYield * sunLowGrowFactor * windMediumGrowFactor);
        return cornYield;
    }
};


const getYieldForCrop = (input) => {
    return input.crop.yield * input.numCrops;
};

const getTotalYield = (input) => {
    const crops = input.crops;
    const cropYieldArray = crops.map(veggie => veggie.crop.yield * veggie.numCrops);
    const totalYield = cropYieldArray.reduce((accumulator, currentValue) => {
        return accumulator + currentValue;
    });
    return totalYield;
};

const getCostsForCrop = (input) => {
    return input.numCrops * input.crop.cost;
};

const getRevenueForCrop = (input) => {
    const totalYield = input.crop.yield * input.numCrops;
    return totalYield * input.crop.salePrice;
};

const getProfitForCrop = (input) => {
    const revenue = getRevenueForCrop(input);
    const costs = getCostsForCrop(input);
    return revenue - costs;
};

const getTotalProfit = (input) => {
    const crops = input.crops;
    //console.log(crops);
    const cropProfitArray = crops.map(veggie => {
        return getRevenueForCrop(veggie) - getCostsForCrop(veggie);
    });
    const totalProfit = cropProfitArray.reduce((accumulator, currentValue) => {
        return accumulator + currentValue;
    });
    return totalProfit;
};



module.exports = {
    getYieldForPlant,
    getYieldForCrop,
    getTotalYield,
    getCostsForCrop,
    getRevenueForCrop,
    getProfitForCrop,
    getTotalProfit,
}