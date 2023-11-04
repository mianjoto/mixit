import { MixitInput, ShuffleOption } from "@/types/mixit";
import { Playlist } from "@/types/spotify";
import {
  createPlaylistAndPopulateWithTracks,
  replaceTracksInPlaylist,
} from "./spotify-query";
import { Session } from "next-auth";
import {
  fisherYatesShuffle,
  getRandomSongsFromPlaylist,
  getLikedSongsAsPlaylist,
} from "./mixit";

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
    playlist = await getLikedSongsAsPlaylist(session, shuffleOptions);
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
    const result = await createPlaylistAndPopulateWithTracks(
      "Mixit Playlist",
      shuffledTracks,
      session
    );

    return result;
  } else {
    const result = await replaceTracksInPlaylist(
      playlist.id,
      shuffledTracks,
      session
    );
    return result;
  }
}
