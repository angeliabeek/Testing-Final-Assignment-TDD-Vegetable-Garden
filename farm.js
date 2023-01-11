const getYieldForPlant = (corn) => {
    return corn.yield * 1;
};

const getYieldForCrop = (input) => {
    return input.crop.yield * input.numCrops;
};

const getTotalYield = (input) => {
    const crops = input.crops;
    const cropYield = crops.map(veggie => veggie.crop.yield * veggie.numCrops);
    const totalYield = cropYield.reduce((accumulator, currentValue) => {
        return accumulator + currentValue;
    });
    return totalYield;
};


module.exports = {
    getYieldForPlant,
    getYieldForCrop,
    getTotalYield,
}