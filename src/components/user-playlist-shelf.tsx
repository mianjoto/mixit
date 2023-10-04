"use client";
import { useQuery } from "@tanstack/react-query";
import { Playlist, getTopPlaylists } from "../../lib/spotify-query";
import { DashboardContentShelf } from "./dashboard-content-shelf";
import PlaylistCard, {
  generatePlaceholderPlaylistCards,
} from "./playlist-card";

import { useSession } from "next-auth/react";

export function UserPlaylistShelf() {
  const { data: session } = useSession();

  const { data: playlists, isLoading } = useQuery({
    queryKey: ["topPlaylists"],
    queryFn: () => getTopPlaylists({ session }),
    enabled: !!session,
    staleTime: 5 * 60 * 1000,
  });

  if (isLoading) {
    return (
      <DashboardContentShelf headingText={undefined}>
        {undefined}
      </DashboardContentShelf>
    );
  }

  if (playlists === undefined) {
    const placeholderCards = generatePlaceholderPlaylistCards(3);

    return (
      <DashboardContentShelf headingText="Sign in to mix your playlists">
        {placeholderCards}
      </DashboardContentShelf>
    );
  }

  const playlistCards = generatePlaylistCards(playlists);

  return (
    <DashboardContentShelf headingText={"Mix your playlists"}>
      {playlistCards}
    </DashboardContentShelf>
  );
}

const generatePlaylistCards = (
  playlists: Playlist[] | undefined
): React.JSX.Element[] | React.JSX.Element => {
  if (playlists !== undefined && playlists !== null) {
    return playlists.map((playlist) => (
      <PlaylistCard playlist={playlist} key={playlist.id} />
    ));
  }

  return <PlaylistCardPlaceholder />;
};
