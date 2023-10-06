"use client";

import { createContext } from "react";

export type SpotifyContextType = {
  user: SpotifyApi.CurrentUsersProfileResponse | undefined;
  playlistQueryResult: {
    playlists: SpotifyApi.PlaylistObjectSimplified[] | undefined;
    isPlaylistQueryError: boolean;
    isPlaylistQuerySuccess: boolean;
  };
};

const SpotifyContext = createContext<SpotifyContextType | null>(null);
export default SpotifyContext;
