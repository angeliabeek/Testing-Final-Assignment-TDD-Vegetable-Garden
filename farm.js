const getYieldForPlant = (corn, factors) => {
    const yieldForPlant = corn.yield;

    if (!factors) {
        return yieldForPlant;
    }
    else {
        const sunValue = factors.sun;
        const windValue = factors.wind;
        const sunFactor = 1 + (corn.factor.sun[sunValue] / 100);
        const windFactor = 1 + (corn.factor.wind[windValue] / 100);
        const yieldForPlantWithFactors = Math.round(yieldForPlant * sunFactor * windFactor);
        return yieldForPlantWithFactors;
    }
};

const getYieldForCrop = (input, factors) => {
    const yieldForCrop = input.crop.yield * input.numCrops;

    if (!factors) {
        return yieldForCrop;
    }
    else {
        const sunValue = factors.sun;
        const windValue = factors.wind;
        const sunFactor = 1 + (input.crop.factor.sun[sunValue] / 100);
        const windFactor = 1 + (input.crop.factor.wind[windValue] / 100);
        const yieldForCropWithFactors = Math.round(yieldForCrop * sunFactor * windFactor);
        return yieldForCropWithFactors;
    }
};

const getTotalYield = (input, factors) => {
    const crops = input.crops;

    if (!factors) {
        const yieldArray = crops.map(veggie => veggie.crop.yield * veggie.numCrops);
        const totalYield = yieldArray.reduce((accumulator, currentValue) => {
            return accumulator + currentValue;
        });
        return totalYield;
    }
    else {
        const yieldArrayWithFactors = crops.map(veggie => {
            const sunValue = factors.sun;
            const windValue = factors.wind;
            const sunFactor = 1 + (veggie.crop.factor.sun[sunValue] / 100);
            const windFactor = 1 + (veggie.crop.factor.wind[windValue] / 100);
            const yieldForCrop = veggie.crop.yield * veggie.numCrops;
            const yieldWithFactors = Math.round(yieldForCrop * sunFactor * windFactor);
            return yieldWithFactors;
        });

        const totalYieldWithFactors = yieldArrayWithFactors.reduce((accumulator, currentValue) => {
            return accumulator + currentValue;
        });
        return totalYieldWithFactors;
    };
};


const getCostsForCrop = (input) => {
    const costsForCrop = input.numCrops * input.crop.cost;
    return costsForCrop;
};

const getRevenueForCrop = (input, factors) => {
    const yieldForCrop = input.crop.yield * input.numCrops;

    if (!factors) {
        const revenueForCrop = yieldForCrop * input.crop.salePrice;
        return revenueForCrop;
    }
    else {
        const sunValue = factors.sun;
        const windValue = factors.wind;
        const sunFactor = 1 + (input.crop.factor.sun[sunValue] / 100);
        const windFactor = 1 + (input.crop.factor.wind[windValue] / 100);
        const yieldWithFactors = Math.round(yieldForCrop * sunFactor * windFactor);
        const revenueForCropWithFactors = yieldWithFactors * input.crop.salePrice;
        return revenueForCropWithFactors;
    }
};

const getProfitForCrop = (input, factors) => {
    const revenueForCrop = getRevenueForCrop(input, factors);
    const costsForCrop = getCostsForCrop(input);
    const profitForCrop = revenueForCrop - costsForCrop;
    return profitForCrop;
};

const getTotalProfit = (input, factors) => {
    const crops = input.crops;

    if (!factors) {
        const totalProfitArray = crops.map(veggie => {
            return getRevenueForCrop(veggie) - getCostsForCrop(veggie);
        });
        const totalProfit = totalProfitArray.reduce((accumulator, currentValue) => {
            return accumulator + currentValue;
        });
        return totalProfit;
    }
    else {
        const totalProfitArrayWithFactors = crops.map(veggie => {
            return getRevenueForCrop(veggie, factors) - getCostsForCrop(veggie, factors);
        });
        const totalProfitWithFactors = totalProfitArrayWithFactors.reduce((accumulator, currentValue) => {
            return accumulator + currentValue;
        });
        return totalProfitWithFactors;
    }
};

module.exports = {
    getYieldForPlant,
    getYieldForCrop,
    getTotalYield,
    getCostsForCrop,
    getRevenueForCrop,
    getProfitForCrop,
    getTotalProfit
};