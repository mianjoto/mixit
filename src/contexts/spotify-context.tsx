"use client";

import { Playlist } from "@/types/spotify";
import { createContext } from "react";

export type SpotifyContextType = {
  user: SpotifyApi.CurrentUsersProfileResponse | undefined;
  playlistQueryResult: {
    playlists: Playlist[] | undefined;
    isPlaylistQueryError: boolean;
    isPlaylistQuerySuccess: boolean;
  };
};

const SpotifyContext = createContext<SpotifyContextType | null>(null);
export default SpotifyContext;
