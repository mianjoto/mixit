import { MixitInput, ShuffleOption } from "@/types/mixit";
import { Playlist } from "@/types/spotify";
import {
  createPlaylistAndPopulateWithTracks,
  getCurrentUser,
  getLikedSongsAsPlaylist,
  replaceTracksInPlaylist,
} from "./spotify-query";
import { Session } from "next-auth";
import { fisherYatesShuffle, getRandomSongsFromPlaylist } from "./mixit";

type useShufflerAppParams = {
  data: MixitInput;
  shuffleOptions: ShuffleOption[];
  session: Session;
};

export async function useShufflerApp({
  data,
  shuffleOptions,
  session,
}: useShufflerAppParams): Promise<
  (SpotifyApi.CreatePlaylistResponse | undefined) | string
> {
  let playlist;
  if (data.input.type === "liked-songs") {
    playlist = await getLikedSongsAsPlaylist(session);
  } else {
    playlist = data.input.playlist as Playlist;
  }

  console.log("playlist to shuffle=", playlist);
  const tracks = await getRandomSongsFromPlaylist(
    playlist as Playlist,
    session,
    shuffleOptions
  );

  const shuffledTracks: string[] = fisherYatesShuffle(tracks);

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
