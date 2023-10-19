"use client";

import { LikedSongsPlaylist, Playlist } from "@/types/spotify";
import { Dispatch, SetStateAction, createContext } from "react";

export type SelectedPlaylistContextType = {
  selectedPlaylist: Playlist | LikedSongsPlaylist | null;
  setSelectedPlaylist: Dispatch<SetStateAction<Playlist | null>>;
};

const SelectedPlaylistContext =
  createContext<SelectedPlaylistContextType | null>(null);
export default SelectedPlaylistContext;
