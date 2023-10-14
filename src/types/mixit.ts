import { Playlist, LikedSongsPlaylist } from "./spotify";

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
  type: ShuffleInputType | null;
  playlist?: Playlist | LikedSongsPlaylist;
};

/**
 * The output for the shuffle function
 */
export type ShuffleOutputType = "song-order" | "new-playlist";

/**
 * The parameters for the shuffle function - provides an disabled parameter
 * and disabled reason if the shuffle function is disabled.
 */
export type ShuffleOutput = {
  type: ShuffleOutputType;
  disabled?: boolean;
  reasonForDisabling?: string;
};

export type MixitInput = { input: ShuffleInput; output: ShuffleOutput };
