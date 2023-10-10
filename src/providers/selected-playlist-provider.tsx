"use client";

import { Playlist } from "@/types/spotify";
import { useState } from "react";
import SelectedPlaylistContext from "@/contexts/selected-playlist-context";

interface SelectedPlaylistProviderProps {
  children: React.ReactNode;
}

export default function SelectedPlaylistProvider({
  children,
}: SelectedPlaylistProviderProps) {
  const [selectedPlaylist, setSelectedPlaylist] = useState<Playlist | null>(
    null
  );

  return (
    <SelectedPlaylistContext.Provider
      value={{ selectedPlaylist, setSelectedPlaylist }}
    >
      {children}
    </SelectedPlaylistContext.Provider>
  );
}
