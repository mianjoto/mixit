"use client";

import { DashboardContentShelf } from "./dashboard-content-shelf";
import PlaylistCard from "./playlist-card";
import { Playlist } from "../../lib/spotify-query";

type UserPlaylistShelfProps = {
  headingText: string;
  playlists: Playlist[];
  filterFn?: (arg0: Playlist) => boolean;
};

export function UserPlaylistShelf({
  headingText,
  playlists,
  filterFn,
}: UserPlaylistShelfProps) {
  if (filterFn !== undefined) {
    playlists = playlists.filter(filterFn);
  }

  const playlistCards = playlists.map((playlist) => (
    <PlaylistCard playlist={playlist} key={playlist.id} />
  ));

  return (
    <DashboardContentShelf headingText={headingText}>
      {playlistCards}
    </DashboardContentShelf>
  );
}
