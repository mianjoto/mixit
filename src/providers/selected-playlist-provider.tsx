"use client";

import { Playlist } from "@/types/spotify";
import { useState } from "react";
import SelectedPlaylistContext, {
  SelectedPlaylistType,
} from "@/contexts/selected-playlist-context";

interface SelectedPlaylistProviderProps {
  children: React.ReactNode;
}

export default function SelectedPlaylistProvider({
  children,
}: SelectedPlaylistProviderProps) {
  const [selectedPlaylist, setSelectedPlaylist] =
    useState<SelectedPlaylistType | null>(null);

  return (
    <SelectedPlaylistContext.Provider
      value={{ selectedPlaylist, setSelectedPlaylist }}
    >
      {children}
    </SelectedPlaylistContext.Provider>
  );
}
