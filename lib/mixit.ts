import { LikedSongsPlaylist, Playlist } from "@/types/spotify";
import SpotifyWebApi from "spotify-web-api-node";
import {
  MAX_PLAYLIST_LENGTH,
  MAX_SONGS_PER_REQUEST,
  getSpotifyApi,
  getTracksSliceFromPlaylist,
} from "./spotify-query";
import { ShuffleOption } from "@/types/mixit";
import {
  IncludeExplicitSongs,
  PREFER_OLDER_SONGS_BIAS,
  PreferOlderSongs,
} from "@/data/objects/shuffle-options";
import { signIn } from "next-auth/react";
import { Session } from "next-auth";

const MIN_TRACKS_FOR_RANDOM_SAMPLING = 201;
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
    return await lazyWindowRandomSongs(playlist, spotify, shuffleOptions);
  }

  return await cherryPickRandomSongs(spotify, playlist, shuffleOptions);
}

async function lazyWindowRandomSongs(
  playlist: SpotifyApi.PlaylistObjectFull,
  spotify: SpotifyWebApi,
  options: ShuffleOption[]
) {
  const paginationOptions = getLazyWindowPaginationOptions(playlist);
  console.log("paginationOptions for lazy sliding=", paginationOptions);

  const selectedSongUris: string[] = [];

  await Promise.all(
    paginationOptions.map(async (paginationOption) => {
      let sliceOfTracks = await getTracksSliceFromPlaylist(
        spotify,
        playlist,
        paginationOption
      );

      // Filter out explicit songs if option is not selected
      if (!options.includes(IncludeExplicitSongs)) {
        sliceOfTracks = sliceOfTracks.filter((track) => !track?.explicit);
      }

      sliceOfTracks.map((track) => {
        selectedSongUris.push(track?.uri as string);
      });
    })
  );

  return selectedSongUris;
}

export async function getLikedSongsAsPlaylist(
  session: Session
): Promise<LikedSongsPlaylist> {
  if (!session) {
    signIn("spotify");
    return Promise.reject("No session");
  }

  const spotify = getSpotifyApi(session);

  // Get the first song so something is requested
  const likedSongResponse = await spotify.getMySavedTracks();
  const likedSongs = likedSongResponse.body.items;

  if (likedSongResponse.statusCode !== 200) {
    Promise.reject("Error getting user");
  }

  const userId = (await spotify.getMe()).body.id;
  const totalLikedSongs = likedSongResponse.body.total;

  const likedSongsPlaylist = {
    name: "Liked Songs",
    id: "liked-songs-id",
    userId: userId,
    tracks: {
      href: "https://api.spotify.com/v1/me/tracks",
      total: totalLikedSongs,
      items: likedSongs,
    },
  } as LikedSongsPlaylist;

  return likedSongsPlaylist;
}

export function getLazyWindowPaginationOptions(
  playlist: SpotifyApi.PlaylistObjectFull
) {
  const totalNumberOfTracks = playlist.tracks.total;
  let windowSize = MAX_PLAYLIST_LENGTH;
  if (totalNumberOfTracks < MAX_PLAYLIST_LENGTH) {
    windowSize = totalNumberOfTracks;
  }

  const randomOffset = getRandomOffset(
    windowSize,
    totalNumberOfTracks,
    undefined
  );

  const paginationOptions = [
    {
      limit: MAX_SONGS_PER_REQUEST,
      offset: randomOffset,
    },
  ];

  // If there are more than 50 songs, get the next 50 songs
  if (totalNumberOfTracks > MAX_SONGS_PER_REQUEST) {
    paginationOptions.push({
      limit: MAX_SONGS_PER_REQUEST,
      offset: randomOffset + MAX_SONGS_PER_REQUEST,
    });
  }

  return paginationOptions;
}

async function cherryPickRandomSongs(
  spotify: SpotifyWebApi,
  playlist: SpotifyApi.PlaylistObjectFull,
  options: ShuffleOption[]
) {
  const totalTracksInPlaylist = playlist.tracks.total;

  const allPaginationOptions = getAllCherryPickPaginationOptions(
    totalTracksInPlaylist,
    SONGS_REQUESTED_PER_CHERRY_PICK,
    options
  );

  const selectedSongUris: string[] = [];

  await Promise.all(
    allPaginationOptions.map(async (paginationOption) => {
      let sliceOfTracks = await getTracksSliceFromPlaylist(
        spotify,
        playlist,
        paginationOption
      );

      // Filter out explicit songs if option is not selected
      if (!options.includes(IncludeExplicitSongs)) {
        sliceOfTracks = sliceOfTracks.filter((track) => !track?.explicit);
      }

      sliceOfTracks.map((track) => {
        selectedSongUris.push(track?.uri as string);
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

  if (windowSize === totalNumberOfTracks) {
    return 0;
  }

  const upperBound = totalNumberOfTracks - windowSize - 1;
  const lowerBound = 0;

  if (shuffleOptions?.includes(PreferOlderSongs)) {
    const randomFloat = Math.random();

    if (randomFloat < PREFER_OLDER_SONGS_BIAS) {
      const olderThird = Math.floor((2 * (upperBound - lowerBound)) / 3);
      return Math.floor(Math.random() * (upperBound - olderThird) + olderThird);
    }
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
