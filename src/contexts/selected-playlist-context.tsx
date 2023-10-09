"use client";

import { Dispatch, SetStateAction, createContext } from "react";
import { Playlist } from "../../lib/spotify-query";

export type SelectedPlaylistContextType = {
  selectedPlaylist: Playlist | null;
  setSelectedPlaylist: Dispatch<
    SetStateAction<SpotifyApi.PlaylistObjectSimplified | null>
  >;
};

const SelectedPlaylistContext =
  createContext<SelectedPlaylistContextType | null>(null);
export default SelectedPlaylistContext;
