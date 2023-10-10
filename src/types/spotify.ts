/**
 * Type aliases for the various Spotify API objects
 */
export type Playlist = SpotifyApi.PlaylistObjectFull;

/**
 * The ID for the user's liked songs playlist.
 */
export type LikedSongsId = "liked-songs-id";

/**
 * The custom shape for the user's liked songs playlist.
 */
export type LikedSongsPlaylist = {
  name: "Liked Songs";
  id: LikedSongsId;
  userId: SpotifyApi.UserObjectPublic["id"];
  tracks: {
    href: "https://api.spotify.com/v1/me/tracks";
    total: number;
    items: SpotifyApi.SavedTrackObject[];
  };
};

/**
 * The type explaining the different types of playlists that can be shuffled.
 */
export type PlaylistShuffleType = "all-playlists" | "user-playlists";

/**
 * The input for the shuffle function.
 */
export type ShuffleInputType = "liked-songs" | PlaylistShuffleType;

/**
 * The parameters for the shuffle function - provides an optional playlist
 * parameter if the user wants to shuffle a specific playlist.
 */
export type ShuffleInput = {
  type: ShuffleInputType;
  playlist?: Playlist | LikedSongsPlaylist;
};

/**
 * The output for the shuffle function
 */
export type ShuffleOutputType = "song-order" | "new-playlist";

export type ShuffleOutput = {
  type: ShuffleOutputType;
  disabled?: boolean;
  reasonForDisabling?: string;
};
