import { shuffle } from "../lib/shuffler";

describe("shuffle function shuffles items as expected", () => {
    test("empty array returns empty array", () => {
        const emptyArray: Array<number> = [];
        expect(shuffle(emptyArray)).toMatchObject(emptyArray);
    });
    test("items are shuffled in-place (modifying the initial array)", () => {
        const initialArray = [1, 2, 3, 4, 5];
        const shuffledArray = shuffle(initialArray);
        expect(shuffledArray).toMatchObject(initialArray);
    });
    test("can shuffle array with mixed objects", () => {
        const initialArray = ["one", 2, { three: 3 }, true];
        const initialArrayShallowCopy = Array.from(initialArray);
        expect(shuffle(initialArray)).not.toMatchObject(
            initialArrayShallowCopy
        );
    });
});
