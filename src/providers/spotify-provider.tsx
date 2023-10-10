"use client";

import { useQuery } from "@tanstack/react-query";
import SpotifyContext from "../contexts/spotify-context";
import {
  getCurrentUser,
  getTopPlaylists,
  getSearchResults,
  getUserLikedSongs,
} from "../../lib/spotify-query";
import { useSession } from "next-auth/react";

interface SpotifyProviderProps {
  children: React.ReactNode;
}

export default function SpotifyProvider({ children }: SpotifyProviderProps) {
  const { data: session } = useSession();

  const {
    data: playlists,
    isError: isPlaylistQueryError,
    isSuccess: isPlaylistQuerySuccess,
  } = useQuery({
    queryKey: ["topPlaylists"],
    queryFn: () =>
      getTopPlaylists({ session, paginationOptions: { limit: 50 } }),
    enabled: !!session,
    staleTime: 5 * 60 * 1000,
  });

  const playlistQueryResult = {
    playlists,
    isPlaylistQueryError,
    isPlaylistQuerySuccess,
  };

  const { data: user } = useQuery({
    queryKey: ["user"],
    queryFn: () => getCurrentUser({ session }),
    enabled: !!session,
    staleTime: 5 * 60 * 1000,
  });

  // TODO: Add additional queries here...

  return (
    <SpotifyContext.Provider value={{ user, playlistQueryResult }}>
      {children}
    </SpotifyContext.Provider>
  );
}
