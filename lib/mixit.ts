import { MixitInput, ShuffleOption } from "@/types/mixit";
import { Playlist, PlaylistOrLikedSongs } from "@/types/spotify";
import SpotifyWebApi from "spotify-web-api-node";
import {
  createPlaylistAndPopulateWithTracks,
  getSongsFromPlaylist,
  getUserLikedSongs,
  replaceTracksInPlaylist,
} from "./spotify-query";
import { Session } from "next-auth";

type useShufflerAppParams = {
  data: MixitInput;
  options: ShuffleOption[];
  session: Session;
};

export async function useShufflerApp({
  data,
  options,
  session,
}: useShufflerAppParams): Promise<
  (SpotifyApi.CreatePlaylistResponse | undefined) | string
> {
  console.log("options=", options);
  let playlist;
  if (data.input.type === "liked-songs") {
    playlist = await getUserLikedSongs({ session });
  } else {
    playlist = data.input.playlist as Playlist;
  }

  const tracks = await getSongsFromPlaylist(playlist as Playlist, session);

  const shuffledTracks = fisherYatesShuffle(tracks);

  if (data.output.type === "new-playlist") {
    return await createPlaylistAndPopulateWithTracks(
      "Mixit Playlist",
      shuffledTracks,
      session
    );
  } else {
    return replaceTracksInPlaylist(playlist.id, shuffledTracks, session);
  }
}

function fisherYatesShuffle<T>(array: T[]): T[] {
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
