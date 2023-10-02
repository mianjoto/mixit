"use client";

import { DashboardContentShelf } from "./dashboard";
import { useQuery } from "@tanstack/react-query";
import { getTopPlaylists } from "../../lib/spotify-query";
import useSpotify from "@/hooks/useSpotify";
import PlaylistCard from "./playlist-card";

export function UserPlaylistShelf() {
  const spotifyApi = useSpotify();

  const { data: playlists } = useQuery({
    queryKey: ["topPlaylists"],
    queryFn: () => getTopPlaylists({ spotifyApi }),
    enabled: !!spotifyApi,
    staleTime: 5 * 60 * 1000,
  });

  const headingText = playlists !== undefined ? "Mix your playlists" : "";

  const playlistCards = generatePlaylistCards(playlists);

  return (
    <DashboardContentShelf headingText={headingText}>
      {playlistCards}
    </DashboardContentShelf>
  );
}

const generatePlaylistCards = (
  playlists: SpotifyApi.PlaylistObjectSimplified[] | undefined
): React.JSX.Element[] | null => {
  if (playlists !== undefined) {
    return playlists.map((playlist) => (
      <PlaylistCard playlist={playlist} key={playlist.id} />
    ));
  }

  return null;
};
