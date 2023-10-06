"use client";
import SpotifyContext, { SpotifyContextType } from "@/contexts/spotify-context";
import { useSession } from "next-auth/react";
import { useContext } from "react";
import { DashboardContentShelf } from "./dashboard-content-shelf";
import PlaylistCard from "./playlist-card";
import SpotifyLoginButton from "./spotify-login-button";

export function UserPlaylistShelf() {
  const { data: session } = useSession();

  const {
    playlistQueryResult: {
      playlists,
      isPlaylistQueryError: isError,
      isPlaylistQuerySuccess: isSuccess,
    },
  } = useContext(SpotifyContext) as SpotifyContextType;

  console.log("playlists=", playlists);

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
