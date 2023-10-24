"use client";

import { LikedSongsPlaylist, Playlist } from "@/types/spotify";
import { Dispatch, SetStateAction, createContext } from "react";

export type SelectedPlaylistType = Playlist | LikedSongsPlaylist | null;

export type SelectedPlaylistContextType = {
  selectedPlaylist: SelectedPlaylistType;
  setSelectedPlaylist: Dispatch<SetStateAction<SelectedPlaylistType | null>>;
};

const SelectedPlaylistContext =
  createContext<SelectedPlaylistContextType | null>(null);
export default SelectedPlaylistContext;
