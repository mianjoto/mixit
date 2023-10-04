"use client";
import { useQuery } from "@tanstack/react-query";
import { Playlist, getTopPlaylists } from "../../lib/spotify-query";
import { DashboardContentShelf } from "./dashboard-content-shelf";
import PlaylistCard from "./playlist-card";

import { useSession } from "next-auth/react";
import SpotifyLoginButton from "./spotify-login-button";

export function UserPlaylistShelf() {
  const { data: session } = useSession();

  const { data: playlists, isSuccess } = useQuery({
    queryKey: ["topPlaylists"],
    queryFn: () => getTopPlaylists({ session }),
    enabled: !!session,
    staleTime: 5 * 60 * 1000,
  });

  if (session === null) {
    return (
      <DashboardContentShelf headingText="Sign in to mix your playlists">
        <SpotifyLoginButton />
      </DashboardContentShelf>
    );
  }

  if (!isSuccess || playlists === undefined) {
    return (
      <DashboardContentShelf headingText={undefined}>
        {undefined}
      </DashboardContentShelf>
    );
  }

  const playlistCards = playlists.map((playlist) => (
    <PlaylistCard playlist={playlist} key={playlist.id} />
  ));

  return (
    <DashboardContentShelf headingText={"Mix your playlists"}>
      {playlistCards}
    </DashboardContentShelf>
  );
}
