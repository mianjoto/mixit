import { shuffle } from "../lib/shuffler";

describe("shuffle function shuffles items as expected", () => {
    test("empty array returns empty array", () => {
        const emptyArray = [];
        expect(shuffle(emptyArray)).toBe(emptyArray);
    });
});
