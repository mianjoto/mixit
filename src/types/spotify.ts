/**
 * Type aliases for the various Spotify API objects
 */
export type Playlist = SpotifyApi.PlaylistObjectFull;

/**
 * The ID for the user's liked songs playlist.
 */
export const LikedSongsId = "liked-songs-id";

/**
 * The custom shape for the user's liked songs playlist.
 */
export type LikedSongsPlaylist = {
  name: "Liked Songs";
  id: typeof LikedSongsId;
  userId: SpotifyApi.UserObjectPublic["id"];
  tracks: {
    href: "https://api.spotify.com/v1/me/tracks";
    total: number;
    items: SpotifyApi.SavedTrackObject[];
  };
};

/**
 * The type for either a Playlist or LikedSongPlaylist object (as the potential result
 * of the ShuffleInputType)
 */
export type PlaylistOrLikedSongs = Playlist | LikedSongsPlaylist;
