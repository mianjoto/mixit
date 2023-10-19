import { ShuffleOption } from "@/types/mixit";

/**
 * The percentage chance for the shuffler to choose a song that's "older" rather
 * than newer
 */
export const PREFER_OLDER_SONGS_BIAS = 0.75;

export const PreferOlderSongs = {
  id: "prefer-older-songs",
  description: "Prefer songs you haven't listened to in a while",
  defaultEnabled: true,
} as ShuffleOption;

const Shuffler: ShuffleOption[] = [PreferOlderSongs];

const Blender: ShuffleOption[] = [
  {
    id: "404-not-implemented",
    description: "This is in development -- come back later!",
  },
];

const PickAndMix: ShuffleOption[] = [
  {
    id: "404-not-implemented",
    description: "This is in development -- come back later!",
  },
];

const TimeMachine: ShuffleOption[] = [
  {
    id: "404-not-implemented",
    description: "This is in development -- come back later!",
  },
];

export { Shuffler, Blender, PickAndMix, TimeMachine };
