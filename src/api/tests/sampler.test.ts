import { sample } from "../lib/sampler";

describe("sample function samples items as expected", () => {
    test("empty array returns empty array", () => {
        const emptyArray: Array<number> = [];
        expect(sample(emptyArray, 10)).toMatchObject(emptyArray);
    });
    test("correct number of items are sampled", () => {
        const initialArray = [1, 2, 3, 4, 5];
        const sampledArray = sample(initialArray, 3);
        expect(sampledArray).toHaveLength(3);
    });
    test("sampling an array with an end/out-of-bounds sample size returns the array", () => {
        const initialArray = [1, 2, 3, 4, 5];
        expect(sample(initialArray, 10)).toMatchObject(initialArray);
        expect(sample(initialArray, 5)).toMatchObject(initialArray);
    });
});
