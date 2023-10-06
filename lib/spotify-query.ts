import SpotifyWebApi from "spotify-web-api-node";
import spotifyApi from "./spotify-auth";
import { signIn } from "next-auth/react";
import { Session } from "next-auth";

// Type aliases for Spotify API objects
export type Playlist = SpotifyApi.PlaylistObjectSimplified;

interface getTopPlaylistOptions {
  session: Session | null;
  paginationOptions?: { limit?: number; offset?: number };
}

export async function getTopPlaylists({
  session,
  paginationOptions,
}: getTopPlaylistOptions): Promise<SpotifyApi.PlaylistObjectSimplified[]> {
  if (!session) {
    signIn("spotify");
    return Promise.reject("No session");
  }

  const spotify = getSpotifyApi(session);

  const user = await getCurrentUser({ session });

  const playlistResponse = await spotify.getUserPlaylists(
    user.id,
    paginationOptions
  );

  if (playlistResponse.statusCode !== 200) {
    Promise.reject("Error getting user playlists");
  }

  return playlistResponse.body.items;
}

type getCurrentUserOptions = {
  session: Session | null;
};

export async function getCurrentUser({
  session,
}: getCurrentUserOptions): Promise<SpotifyApi.CurrentUsersProfileResponse> {
  if (!session) {
    signIn("spotify");
    return Promise.reject("No session");
  }

  const spotify = getSpotifyApi(session);

  const userResponse = await spotify.getMe();

  if (userResponse.statusCode !== 200) {
    Promise.reject("Error getting user");
  }

  return userResponse.body;
}

function getSpotifyApi(session: Session): SpotifyWebApi {
  if (
    !spotifyApi.getAccessToken() ||
    spotifyApi.getAccessToken() !== session.accessToken
  ) {
    spotifyApi.setAccessToken(session.accessToken);
  }

  return spotifyApi;
}
