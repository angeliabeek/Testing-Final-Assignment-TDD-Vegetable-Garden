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
        factor: {
            sun: {
                low: -50,
                medium: 0,
                high: 50,
            },
            wind: {
                lotsOf: -60,
                medium: -30,
                little: 100,
            },
        },
    };
    const environmentFactors = {
        sun: "low",
        wind: "medium",
    };

    test("Get yield for plant with no environment factors", () => {
        expect(getYieldForPlant(corn)).toBe(30);
    });

    test("Get yield for plant with environment factors", () => {
        expect(getYieldForPlant(corn, environmentFactors)).toBe(11);
    });
});

describe("getYieldForCrop", () => {
    const corn = {
        name: "corn",
        yield: 3,
        factor: {
            sun: {
                low: -50,
                medium: 0,
                high: 50,
            },
            wind: {
                lotsOf: -60,
                medium: -30,
                little: 100,
            },
        },
    };
    const input = {
        crop: corn,
        numCrops: 10,
    };
    const environmentFactors = {
        sun: "low",
        wind: "medium",
    };

    test("Get yield for crop, simple", () => {
        expect(getYieldForCrop(input)).toBe(30);
    });

    test("Get yield for crop with environmental factors", () => {
        expect(getYieldForCrop(input, environmentFactors)).toBe(11);
    });

});

describe("getTotalYield", () => {
    const corn = {
        name: "corn",
        yield: 3,
        factor: {
            sun: {
                low: -50,
                medium: 0,
                high: 50,
            },
            wind: {
                lotsOf: -60,
                medium: -30,
                little: 40,
            },
        },
    };
    const pumpkin = {
        name: "pumpkin",
        yield: 4,
        factor: {
            sun: {
                low: -20,
                medium: 0,
                high: 200,
            },
            wind: {
                lotsOf: -30,
                medium: 0,
                little: 30,
            },
        },
    };
    const crops = [
        { crop: corn, numCrops: 5 },
        { crop: pumpkin, numCrops: 2 },
    ];
    const environmentFactors = {
        sun: "high",
        wind: "little",
    };

    test("Calculate total yield with multiple crops", () => {
        expect(getTotalYield({ crops })).toBe(23);
    });

    test("Calculate total yield with multiple crops and environmental factors", () => {
        expect(getTotalYield({ crops }, environmentFactors)).toBe(62);
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
    const apple = {
        name: "apple",
        yield: 5,
        salePrice: 2,
        factor: {
            sun: {
                low: -30,
                medium: 100,
                high: 200,
            },
            wind: {
                lotsOf: -60,
                medium: -30,
                little: 0,
            },
        },
    };
    const input = {
        crop: apple,
        numCrops: 3,
    };
    const environmentFactors = {
        sun: "medium",
        wind: "medium",
    };

    test("Calculate the revenue for a crop", () => {
        expect(getRevenueForCrop(input)).toBe(30);
    });

    test("Calculate the revenue for a crop with environmental factors", () => {
        expect(getRevenueForCrop(input, environmentFactors)).toBe(42);
    });
});

describe("getProfitForCrop", () => {
    const corn = {
        name: "corn",
        cost: 1,
        yield: 3,
        salePrice: 3,
        factor: {
            sun: {
                low: -50,
                medium: 0,
                high: 50,
            },
            wind: {
                lotsOf: -60,
                medium: -30,
                little: 100,
            },
        },
    };
    const input = {
        crop: corn,
        numCrops: 10,
    };
    const environmentFactors = {
        sun: "high",
        wind: "little",
    };

    test("calculate the profit for a crop", () => {
        expect(getProfitForCrop(input)).toBe(80);
    });

    test("calculate the profit for a crop with environmental factors", () => {
        expect(getProfitForCrop(input, environmentFactors)).toBe(260);
    });
});

describe("getTotalProfit", () => {
    const corn = {
        name: "corn",
        cost: 1,
        yield: 3,
        salePrice: 3,
        yield: 3,
        factor: {
            sun: {
                low: -50,
                medium: 0,
                high: 50,
            },
            wind: {
                lotsOf: -60,
                medium: -30,
                little: 40,
            },
        },
    };
    const pumpkin = {
        name: "pumpkin",
        cost: 2,
        yield: 4,
        salePrice: 5,
        factor: {
            sun: {
                low: -20,
                medium: 0,
                high: 200,
            },
            wind: {
                lotsOf: -30,
                medium: 0,
                little: 30,
            },
        },
    };
    const crops = [
        { crop: corn, numCrops: 10 },
        { crop: pumpkin, numCrops: 2 },
    ];
    const environmentFactors = {
        sun: "high",
        wind: "little",
    };

    test("Calculate the profit for multible crops", () => {
        expect(getTotalProfit({ crops })).toBe(116);
    });

    test("Calculate the profit for multible crops with environmental factors", () => {
        expect(getTotalProfit({ crops }, environmentFactors)).toBe(330);
    });
});