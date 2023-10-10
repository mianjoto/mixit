"use client";

import { Playlist } from "@/types/spotify";
import { Dispatch, SetStateAction, createContext } from "react";

export type SelectedPlaylistContextType = {
  selectedPlaylist: Playlist | null;
  setSelectedPlaylist: Dispatch<
    SetStateAction<SpotifyApi.PlaylistObjectSimplified | null>
  >;
};

const SelectedPlaylistContext =
  createContext<SelectedPlaylistContextType | null>(null);
export default SelectedPlaylistContext;
