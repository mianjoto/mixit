"use client";

import { useQuery } from "@tanstack/react-query";
import SpotifyContext from "../contexts/spotify-context";
import { getTopPlaylists } from "../../lib/spotify-query";
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
    queryFn: () => getTopPlaylists({ session }),
    enabled: !!session,
    staleTime: 5 * 60 * 1000,
  });

  const playlistQueryResult = {
    playlists,
    isPlaylistQueryError,
    isPlaylistQuerySuccess,
  };

  // TODO: Add additional queries here...

  return (
    <SpotifyContext.Provider value={{ playlistQueryResult }}>
      {children}
    </SpotifyContext.Provider>
  );
}
