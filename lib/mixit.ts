import { Playlist } from "@/types/spotify";
import SpotifyWebApi from "spotify-web-api-node";
import {
  MAX_PLAYLIST_LENGTH,
  MAX_SONGS_PER_REQUEST,
  getSpotifyApi,
  getTracksSliceFromPlaylist,
} from "./spotify-query";
import { ShuffleOption } from "@/types/mixit";
import {
  PREFER_OLDER_SONGS_BIAS,
  PreferOlderSongs,
} from "@/data/objects/shuffle-options";
import { signIn } from "next-auth/react";
import { Session } from "next-auth";

const MIN_TRACKS_FOR_RANDOM_SAMPLING = 500;
const MAX_CHERRY_PICKS = 5;
const SONGS_REQUESTED_PER_CHERRY_PICK = 20;

export async function getRandomSongsFromPlaylist(
  playlist: Playlist,
  session: Session,
  shuffleOptions: ShuffleOption[]
): Promise<SpotifyApi.TrackObjectFull["uri"][]> {
  if (!session) {
    signIn("spotify");
    return Promise.reject("No session");
  }

  const spotify = getSpotifyApi(session);

  const totalTracksInPlaylist = playlist.tracks.total;

  // Lazy sliding window
  if (totalTracksInPlaylist <= MIN_TRACKS_FOR_RANDOM_SAMPLING) {
    return await lazyWindowRandomSongs(playlist, spotify);
  }

  return await cherryPickRandomSongs(spotify, playlist, shuffleOptions);
}

async function lazyWindowRandomSongs(
  playlist: SpotifyApi.PlaylistObjectFull,
  spotify: SpotifyWebApi
) {
  const paginationOptions = getLazyWindowPaginationOptions(playlist);
  console.log("paginationOptions for lazy sliding=", paginationOptions);
  return await getTracksSliceFromPlaylist(spotify, playlist, paginationOptions);
}

export function getLazyWindowPaginationOptions(
  playlist: SpotifyApi.PlaylistObjectFull
) {
  const totalNumberOfTracks = playlist.tracks.total;
  const randomOffset = getRandomOffset(
    MAX_SONGS_PER_REQUEST,
    totalNumberOfTracks,
    undefined
  );

  const paginationOptions = {
    limit: MAX_PLAYLIST_LENGTH,
    offset: randomOffset,
  };

  return paginationOptions;
}

async function cherryPickRandomSongs(
  spotify: SpotifyWebApi,
  playlist: SpotifyApi.PlaylistObjectFull,
  shuffleOptions: ShuffleOption[]
) {
  const totalTracksInPlaylist = playlist.tracks.total;

  const allPaginationOptions = getAllCherryPickPaginationOptions(
    totalTracksInPlaylist,
    SONGS_REQUESTED_PER_CHERRY_PICK,
    shuffleOptions
  );

  const selectedSongUris: string[] = [];

  await Promise.all(
    allPaginationOptions.map(async (paginationOption) => {
      const sliceOfTracks = await getTracksSliceFromPlaylist(
        spotify,
        playlist,
        paginationOption
      );

      sliceOfTracks.map((track) => {
        selectedSongUris.push(track);
      });
    })
  );

  return selectedSongUris;
}

export function getAllCherryPickPaginationOptions(
  totalNumberOfTracks: number,
  windowSize: number,
  shuffleOptions: ShuffleOption[],
  maxCherryPicks?: number
): { limit: number; offset: number }[] {
  if (maxCherryPicks === undefined) {
    maxCherryPicks = MAX_CHERRY_PICKS;
  }

  const validOffsets = getValidOffsets(
    maxCherryPicks,
    windowSize,
    totalNumberOfTracks,
    shuffleOptions
  );

  const paginationOptions: { limit: number; offset: number }[] = [];

  validOffsets.forEach((offset) => {
    paginationOptions.push({ limit: windowSize, offset: offset });
  });

  console.log("paginationOptions for cherryPick=", paginationOptions);

  return paginationOptions;
}

export function getValidOffsets(
  maxCherryPicks: number,
  windowSize: number,
  totalNumberOfTracks: number,
  shuffleOptions: ShuffleOption[]
) {
  let numberOfPicks = 0;
  const validOffsets: number[] = [];

  while (numberOfPicks < maxCherryPicks) {
    let randomOffset = undefined;
    do {
      randomOffset = getRandomOffset(
        windowSize,
        totalNumberOfTracks,
        shuffleOptions
      );
    } while (offsetInfringes(randomOffset, validOffsets, windowSize));

    console.log("valid selected offset chosen:", randomOffset);
    validOffsets.push(randomOffset);
    numberOfPicks++;
  }

  return validOffsets;
}

export function getRandomOffset(
  windowSize: number,
  totalNumberOfTracks: number,
  shuffleOptions: ShuffleOption[] | undefined
): number {
  if (windowSize === 0) {
    windowSize = 1;
  }

  const upperBound = totalNumberOfTracks - windowSize - 1;
  const lowerBound = 0;

  if (shuffleOptions?.includes(PreferOlderSongs)) {
    // const randomFloat = Math.random();

    // if (randomFloat < PREFER_OLDER_SONGS_BIAS) {
    const olderThird = Math.floor((2 * (upperBound - lowerBound)) / 3);
    return Math.floor(Math.random() * (upperBound - olderThird) + olderThird);
    // }
  }

  return Math.floor(Math.random() * (upperBound - lowerBound) + lowerBound);
}

function offsetInfringes(
  randomOffset: number,
  selectedOffsets: number[],
  windowSize: number
) {
  const offsetStart = randomOffset;
  const offsetEnd = randomOffset + windowSize;

  for (let selectedOffset of selectedOffsets) {
    const selectedStart = selectedOffset;
    const selectedEnd = selectedOffset + windowSize;

    if (
      (offsetStart >= selectedStart && offsetStart <= selectedEnd) ||
      (offsetEnd >= selectedStart && offsetEnd <= selectedEnd)
    ) {
      return true;
    }
  }

  return false;
}

export function fisherYatesShuffle<T>(array: T[]): T[] {
  let shuffledArray = [...array];

  let numberOfTracks = shuffledArray.length;

  for (let index = numberOfTracks - 1; index > 0; index--) {
    let randomIndex = Math.floor(Math.random() * (index + 1));

    const temporaryTrack = shuffledArray[index] as T;
    shuffledArray[index] = shuffledArray[randomIndex] as T;
    shuffledArray[randomIndex] = temporaryTrack;
  }

  return shuffledArray;
}
