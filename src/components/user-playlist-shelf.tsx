"use client";

import { DashboardContentShelf } from "./dashboard-content-shelf";
import PlaylistCard from "./playlist-card";
import { DashboardShelfProps } from "./dashboard-shelf";
import { Playlist } from "@/types/spotify";

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

  if (playlists.length === 0) {
    return null;
  }

  const playlistCards = playlists.map((playlist) => (
    <PlaylistCard
      playlist={playlist}
      key={playlist.id}
      small={smallCards}
      showSelectAppModalOnClick
    />
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
