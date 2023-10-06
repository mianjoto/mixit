"use client";

import { DashboardContentShelf } from "./dashboard-content-shelf";
import PlaylistCard from "./playlist-card";
import { Playlist } from "../../lib/spotify-query";
import { DashboardShelfProps } from "./dashboard-shelf";

type UserPlaylistShelfProps = {
  headingText: string;
  playlists: Playlist[];
  smallCards?: boolean;
  filterFn?: (arg0: Playlist) => boolean;
} & DashboardShelfProps;

export function UserPlaylistShelf({
  headingText,
  playlists,
  filterFn,
  mobileBehavior,
  desktopBehavior,
  smallCards = false,
}: UserPlaylistShelfProps) {
  if (filterFn !== undefined) {
    playlists = playlists.filter(filterFn);
  }

  const playlistCards = playlists.map((playlist) => (
    <PlaylistCard playlist={playlist} key={playlist.id} small={smallCards} />
  ));

  return (
    <DashboardContentShelf
      headingText={headingText}
      mobileBehavior={mobileBehavior}
      desktopBehavior={desktopBehavior}
    >
      {playlistCards}
    </DashboardContentShelf>
  );
}
