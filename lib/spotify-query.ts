import SpotifyWebApi from "spotify-web-api-node";
import spotifyApi from "./spotify-auth";
import { signIn } from "next-auth/react";
import { Session } from "next-auth";
import {
  LikedSongsId,
  LikedSongsPlaylist,
  Playlist,
  PlaylistOrLikedSongs,
} from "@/types/spotify";

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

type getUserLikedSongsOptions = {
  session: Session;
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

export async function getSongsFromPlaylist(
  playlist: PlaylistOrLikedSongs,
  session: Session
): Promise<SpotifyApi.TrackObjectFull["uri"][]> {
  if (playlist.id === LikedSongsId) {
    return await getUserLikedSongs({ session }).then((likedSongs) =>
      likedSongs.tracks.items.map((track) => track.track.uri)
    );
  }

  if (!session) {
    signIn("spotify");
    return Promise.reject("No session");
  }

  const spotify = getSpotifyApi(session);

  const tracksResponse = await spotify.getPlaylistTracks(playlist.id);

  if (tracksResponse.statusCode !== 200) {
    Promise.reject("Failed to get tracks from playlist");
  }

  return tracksResponse.body.items.map(
    (track) => track?.track?.uri as string
  ) as unknown as string[];
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

  if (tracksResponse.statusCode !== 200) {
    Promise.reject("Failed to get tracks from playlist");
  }

  return tracksResponse.body.snapshot_id;
}

export async function createPlaylistAndPopulateWithTracks(
  playlistName: string,
  trackUris: SpotifyApi.TrackObjectFull["uri"][],
  session: Session
): Promise<SpotifyApi.CreatePlaylistResponse | undefined> {
  if (!session) {
    signIn("spotify");
    return Promise.reject("No session");
  }

  const spotify = getSpotifyApi(session);

  const playlistResponse = await spotify.createPlaylist(playlistName, {
    description: "Created with Mixit",
  });

  if (playlistResponse.statusCode !== 200) {
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

  return playlist;
}

export async function replaceTracksInPlaylist(
  playlistId: string,
  trackUris: SpotifyApi.TrackObjectFull["uri"][],
  session: Session
): Promise<SpotifyApi.PlaylistSnapshotResponse["snapshot_id"]> {
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

  return replaceTracksResponse.body.snapshot_id;
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
