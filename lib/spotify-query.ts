import SpotifyWebApi from "spotify-web-api-node";
import spotifyApi from "./spotify-auth";
import { signIn } from "next-auth/react";
import { Session } from "next-auth";
import { LikedSongsId, LikedSongsPlaylist, Playlist } from "@/types/spotify";

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

type searchPlaylistOptions = {
  session: Session | null;
  query: string | null;
  paginationOptions?: { limit?: number; offset?: number };
};

export async function getSearchResults({
  session,
  query,
  paginationOptions,
}: searchPlaylistOptions) {
  if (!session) {
    signIn("spotify");
    return Promise.reject("No session");
  }

  if (!query) {
    return Promise.reject("No query");
  }

  const spotify = getSpotifyApi(session);

  const playlistResponse = await spotify.searchPlaylists(
    query,
    paginationOptions
  );

  if (playlistResponse.statusCode !== 200) {
    Promise.reject("Error getting user playlists");
  }

  return playlistResponse.body.playlists;
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

type getUserLikedSongsOptions = {
  session: Session | null;
};

export const MAX_REQUESTS_FOR_LIKED_SONGS = 10;

export async function getUserLikedSongs({
  session,
}: getUserLikedSongsOptions): Promise<LikedSongsPlaylist> {
  if (!session) {
    signIn("spotify");
    return Promise.reject("No session");
  }

  const spotify = getSpotifyApi(session);

  const likedSongs: SpotifyApi.SavedTrackObject[] = [];
  for (
    let offsetIndex = 0;
    offsetIndex < MAX_REQUESTS_FOR_LIKED_SONGS;
    offsetIndex++
  ) {
    const userResponse = await spotify.getMySavedTracks({
      limit: 50,
      offset: offsetIndex * 50,
    });

    if (userResponse.body.next === null) {
      break;
    }

    if (userResponse.statusCode !== 200) {
      Promise.reject("Error getting user");
    }

    const songs = userResponse.body.items;
    likedSongs.push(...songs);
  }

  const userId = (await spotifyApi.getMe()).body.id;

  const likedSongsPlaylist = {
    name: "Liked Songs",
    id: "liked-songs-id",
    userId: userId,
    tracks: {
      href: "https://api.spotify.com/v1/me/tracks",
      total: likedSongs.length,
      items: likedSongs,
    },
  } as LikedSongsPlaylist;

  return likedSongsPlaylist;
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
