import SpotifyWebApi from "spotify-web-api-node";
import spotifyApi from "./spotify-auth";
import { signIn } from "next-auth/react";
import { Session } from "next-auth";
import { LikedSongsId, LikedSongsPlaylist, Playlist } from "@/types/spotify";
import { refreshAccessToken } from "./auth";

interface getTopPlaylistOptions {
  session: Session | null;
  paginationOptions?: { limit?: number; offset?: number };
}

export async function getTopPlaylists({
  session,
  paginationOptions,
}: getTopPlaylistOptions): Promise<Playlist[]> {
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

  return playlistResponse.body.items as unknown as Playlist[];
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

export const MAX_REQUESTS_FOR_LIKED_SONGS = 10;

export const MAX_PLAYLIST_LENGTH = 100;
export const MAX_SONGS_PER_REQUEST = 50;

export async function getTracksSliceFromPlaylist(
  spotify: SpotifyWebApi,
  playlist: Playlist,
  paginationOptions: { limit?: number; offset?: number }
) {
  if (paginationOptions.limit === undefined) {
    paginationOptions.limit = MAX_SONGS_PER_REQUEST;
  }

  if (paginationOptions?.offset === undefined) {
    paginationOptions.offset = 0;
  }

  // If playlist is the Liked Songs playlist, return songs
  // from here (different API endpoint, so this is needed)
  if (playlist.id === LikedSongsId) {
    const likedSongsResponse = await spotify.getMySavedTracks(
      paginationOptions
    );

    if (likedSongsResponse.statusCode !== 200) {
      Promise.reject("Failed to get tracks from Liked Songs playlist");
    }

    return likedSongsResponse.body.items.map((track) => track.track);
  }

  // If normal playlist, return tracks as normal
  const tracksResponse = await spotify.getPlaylistTracks(
    playlist.id,
    paginationOptions
  );

  if (tracksResponse.statusCode !== 200) {
    Promise.reject("Failed to get tracks from playlist");
  }

  return tracksResponse.body.items.map((track) => track.track);
}

type AddTracksToPlaylistOptions = {
  playlistId: string;
  trackUris: SpotifyApi.TrackObjectFull["uri"][];
  session: Session;
};

async function addTracksToPlaylist({
  playlistId,
  session,
  trackUris,
}: AddTracksToPlaylistOptions) {
  if (!session) {
    signIn("spotify");
    return Promise.reject("No session");
  }
  const spotify = getSpotifyApi(session);

  const tracksResponse = await spotify.addTracksToPlaylist(
    playlistId,
    trackUris
  );

  console.log("tracksResponse", tracksResponse);

  if (tracksResponse.statusCode !== 201) {
    Promise.reject("Failed to add tracks to playlist");
  }

  return tracksResponse.body.snapshot_id;
}

export async function createPlaylistAndPopulateWithTracks(
  playlistName: string,
  trackUris: SpotifyApi.TrackObjectFull["uri"][],
  session: Session
) {
  if (trackUris.length === 0) {
    Promise.reject("Did not receive any tracks to create the new playlist");
  }

  if (!session) {
    signIn("spotify");
    return Promise.reject("No session");
  }

  const spotify = getSpotifyApi(session);

  const playlistResponse = await spotify.createPlaylist(playlistName, {
    description: "Created with Mixit",
  });

  console.log("received uris=", trackUris);
  console.log("create playlist response=", playlistResponse);

  if (playlistResponse.statusCode !== 201) {
    Promise.reject("Failed to create playlist");
  }

  const playlist = playlistResponse.body;

  for (let index = 0; index < trackUris.length; index += 100) {
    if (index + 100 > trackUris.length) {
      await addTracksToPlaylist({
        session,
        playlistId: playlist.id,
        trackUris: trackUris.slice(index, trackUris.length),
      });
    } else {
      await addTracksToPlaylist({
        session,
        playlistId: playlist.id,
        trackUris: trackUris.slice(index, index + 100),
      });
    }
  }

  return playlist.uri;
}

export async function replaceTracksInPlaylist(
  playlistId: string,
  trackUris: SpotifyApi.TrackObjectFull["uri"][],
  session: Session
): Promise<SpotifyApi.TrackObjectFull["uri"]> {
  if (!session) {
    signIn("spotify");
    return Promise.reject("No session");
  }

  const spotify = getSpotifyApi(session);

  const replaceTracksResponse = await spotify.replaceTracksInPlaylist(
    playlistId,
    trackUris
  );

  if (replaceTracksResponse.statusCode !== 200) {
    Promise.reject("Failed to replace tracks in playlist");
  }

  const playlistUri = `spotify:playlist:${playlistId}`;
  return playlistUri;
}

export function getSpotifyApi(session: Session): SpotifyWebApi {
  if (
    !spotifyApi.getAccessToken() ||
    spotifyApi.getAccessToken() !== session.accessToken
  ) {
    spotifyApi.setAccessToken(session.accessToken);
  }

  if (session.error === "RefreshAccessTokenError") {
    console.log(
      "Refresh access token error found while getting the spotifyApi, attempting to refresh..."
    );
    refreshAccessToken(session.accessToken);
  }

  return spotifyApi;
}
