import { ShuffleOption } from "@/types/mixit";
import {
  getRandomOffset,
  getAllCherryPickPaginationOptions,
  getValidOffsets,
} from "../../lib/mixit";

describe("getRandomOffset", () => {
  it("returns a random offset within bounds", () => {
    const windowSize = 10;
    const totalTracks = 100;
    const shuffleOptions: ShuffleOption[] = [];

    const result = getRandomOffset(windowSize, totalTracks, shuffleOptions);

    expect(result).toBeGreaterThanOrEqual(0);
    expect(result).toBeLessThan(totalTracks - windowSize);
  });
});

describe("getAllCherryPickPaginationOptions", () => {
  it("returns all cherry picked paginationOptions", () => {
    const windowSize = 20;
    const totalTracks = 500;
    const shuffleOptions: ShuffleOption[] = [];
    const numberOfCherryPicks = 5;

    const result = getAllCherryPickPaginationOptions(
      totalTracks,
      windowSize,
      shuffleOptions,
      numberOfCherryPicks
    );

    expect(result).toHaveLength(numberOfCherryPicks);
    expect(result[0]?.limit).toEqual(windowSize);
  });
});

describe("getValidOffsets", () => {
  it("returns an array of valid offsets", () => {
    const maxCherryPicks = 5;
    const windowSize = 10;
    const totalNumberOfTracks = 100;
    const shuffleOptions: ShuffleOption[] = [];

    const result = getValidOffsets(
      maxCherryPicks,
      windowSize,
      totalNumberOfTracks,
      shuffleOptions
    );

    expect(result).toHaveLength(maxCherryPicks);
    expect(result.every((offset) => offset >= 0)).toBe(true);
    expect(
      result.every((offset) => offset < totalNumberOfTracks - windowSize)
    ).toBe(true);
  });

  it("does not return duplicate offsets", () => {
    const maxCherryPicks = 5;
    const windowSize = 10;
    const totalNumberOfTracks = 100;
    const shuffleOptions: ShuffleOption[] = [];

    const result = getValidOffsets(
      maxCherryPicks,
      windowSize,
      totalNumberOfTracks,
      shuffleOptions
    );

    expect(new Set(result).size).toEqual(maxCherryPicks);
  });

  it("does not return offsets that infringe on each other", () => {
    const maxCherryPicks = 5;
    const windowSize = 10;
    const totalNumberOfTracks = 100;
    const shuffleOptions: ShuffleOption[] = [];

    const result = getValidOffsets(
      maxCherryPicks,
      windowSize,
      totalNumberOfTracks,
      shuffleOptions
    );

    for (let i = 0; i < result.length; i++) {
      for (let j = i + 1; j < result.length; j++) {
        expect(Math.abs(result[i]! - result[j]!)).toBeGreaterThanOrEqual(
          windowSize
        );
      }
    }
  });
});
