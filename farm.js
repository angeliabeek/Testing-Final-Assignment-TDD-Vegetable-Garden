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
        const yieldForPlantWithFactors = Math.round(yieldPlant * sunFactor * windFactor);
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
        const cropYieldArray = crops.map(veggie => veggie.crop.yield * veggie.numCrops);
        const totalYield = cropYieldArray.reduce((accumulator, currentValue) => {
            return accumulator + currentValue;
        });
        return totalYield;
    }
    else {
        const totalYieldArray = crops.map(veggie => {
            const sunValue = factors.sun;
            const windValue = factors.wind;
            const sunFactor = 1 + (veggie.crop.factor.sun[sunValue] / 100);
            const windFactor = 1 + (veggie.crop.factor.wind[windValue] / 100);
            const maxYieldForCrop = veggie.crop.yield * veggie.numCrops;
            const yieldForCrop = Math.round(maxYieldForCrop * sunFactor * windFactor);
            return yieldForCrop;
        });

        const totalYieldWithFactors = totalYieldArray.reduce((accumulator, currentValue) => {
            return accumulator + currentValue;
        });
        return totalYieldWithFactors;
    };
};


const getCostsForCrop = (input) => {
    return input.numCrops * input.crop.cost;
};

const getRevenueForCrop = (input, factors) => {
    const totalYield = input.crop.yield * input.numCrops;

    if (!factors) {
        const revenueForCrop = totalYield * input.crop.salePrice;
        return revenueForCrop;
    }
    else {
        const sunValue = factors.sun;
        const windValue = factors.wind;
        const sunFactor = 1 + (input.crop.factor.sun[sunValue] / 100);
        const windFactor = 1 + (input.crop.factor.wind[windValue] / 100);
        const totalYieldWithFactors = Math.round(totalYield * sunFactor * windFactor);
        return totalYieldWithFactors * input.crop.salePrice;
    }
};

const getProfitForCrop = (input, factors) => {
    const revenue = getRevenueForCrop(input, factors);
    const costs = getCostsForCrop(input);
    const profit = revenue - costs;
    return profit;
};

const getTotalProfit = (input, factors) => {
    const crops = input.crops;

    if (!factors) {
        const cropProfitArray = crops.map(veggie => {
            return getRevenueForCrop(veggie) - getCostsForCrop(veggie);
        });
        const totalProfit = cropProfitArray.reduce((accumulator, currentValue) => {
            return accumulator + currentValue;
        });
        return totalProfit;
    }
    else {
        const totalProfitArray = crops.map(veggie => {
            console.log(getRevenueForCrop(veggie, factors))
            console.log(getCostsForCrop(veggie, factors))
            return getRevenueForCrop(veggie, factors) - getCostsForCrop(veggie, factors);
        });
        const totalProfitWithFactors = totalProfitArray.reduce((accumulator, currentValue) => {
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
    getTotalProfit,
};