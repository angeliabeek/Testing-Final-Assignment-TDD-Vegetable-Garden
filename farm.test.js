const {
    getYieldForPlant,
    getYieldForCrop,
    getTotalYield,
    getCostsForCrop,
    getRevenueForCrop,
    getProfitForCrop,
    getTotalProfit } = require("./farm");

describe("getYieldForPlant", () => {
    const corn = {
        name: "corn",
        yield: 30,
    };

    test("Get yield for plant with no environment factors", () => {
        expect(getYieldForPlant(corn)).toBe(30);
    });
});

describe("getYieldForCrop", () => {
    test("Get yield for crop, simple", () => {
        const corn = {
            name: "corn",
            yield: 3,
        };
        const input = {
            crop: corn,
            numCrops: 10,
        };
        expect(getYieldForCrop(input)).toBe(30);
    });
});

describe("getTotalYield", () => {
    test("Calculate total yield with multiple crops", () => {
        const corn = {
            name: "corn",
            yield: 3,
        };
        const pumpkin = {
            name: "pumpkin",
            yield: 4,
        };
        const crops = [
            { crop: corn, numCrops: 5 },
            { crop: pumpkin, numCrops: 2 },
        ];
        expect(getTotalYield({ crops })).toBe(23);
    });

    test("Calculate total yield with 0 amount", () => {
        const corn = {
            name: "corn",
            yield: 3,
        };
        const crops = [{ crop: corn, numCrops: 0 }];
        expect(getTotalYield({ crops })).toBe(0);
    });
});

describe("getCostsForCrop", () => {
    test("Calculate the cost for a crop", () => {
        const maize = {
            name: "maize",
            cost: 1,
        };
        const input = {
            crop: maize,
            numCrops: 10,
        };
        expect(getCostsForCrop(input)).toBe(10);
    });
});

describe("getRevenueForCrop", () => {
    test("Calculate the revenue for a crop", () => {
        const apple = {
            name: "apple",
            yield: 5,
            salePrice: 2,
        };
        const input = {
            crop: apple,
            numCrops: 3,
        };
        expect(getRevenueForCrop(input)).toBe(30);
    });
});

describe("getProfitForCrop", () => {
    test("calculate the profit for a crop", () => {
        const corn = {
            name: "corn",
            cost: 1,
            yield: 3,
            salePrice: 3,
        };
        const input = {
            crop: corn,
            numCrops: 10,
        };
        expect(getProfitForCrop(input)).toBe(80);
    });
});

describe("getTotalProfit", () => {
    test("Calculate the profit for multible crops", () => {
        const corn = {
            name: "corn",
            cost: 1,
            yield: 3,
            salePrice: 3,
        };
        const pumpkin = {
            name: "pumpkin",
            cost: 2,
            yield: 4,
            salePrice: 5,
        };
        const crops = [
            { crop: corn, numCrops: 10 },
            { crop: pumpkin, numCrops: 2 },
        ];
        expect(getTotalProfit({ crops })).toBe(116);
    });
});