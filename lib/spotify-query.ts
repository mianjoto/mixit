import SpotifyWebApi from "spotify-web-api-node";
import spotifyApi from "./spotify-auth";
import { signIn, useSession } from "next-auth/react";
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

  const response = await spotify.getUserPlaylists(paginationOptions);

  if (response.statusCode !== 200) {
    Promise.reject("Error getting user playlists");
  }

  return response.body.items;
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
