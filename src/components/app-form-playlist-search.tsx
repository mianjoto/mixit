"use client";
import { useQuery } from "@tanstack/react-query";
import { Session } from "next-auth";
import { ChangeEvent, useContext, useEffect, useState } from "react";
import { getSearchResults } from "../../lib/spotify-query";
import { DashboardHeading } from "./dashboard";
import { DashboardShelf } from "./dashboard-shelf";
import PlaylistCard from "./playlist-card";
import { useDebounce } from "@uidotdev/usehooks";
import { SearchInput } from "./ui/search-input";
import { Apps } from "@/types/apps";
import { Playlist } from "@/types/spotify";
import { ShuffleInput, ShuffleInputType, ShuffleOption } from "@/types/mixit";
import SelectedPlaylistContext, {
  SelectedPlaylistContextType,
  SelectedPlaylistType,
} from "@/contexts/selected-playlist-context";

type AppFormPlaylistSearchProps = {
  session: Session;
  app: Apps;
  shuffleInput: ShuffleInput;
  populateWithPlaylist?: SelectedPlaylistType | undefined;
};

export function AppFormPlaylistSearch({
  session,
  app,
  shuffleInput,
  populateWithPlaylist,
}: AppFormPlaylistSearchProps) {
  const [query, setQuery] = useState<string | null>(null);
  const debouncedQuery = useDebounce(query, 250);
  const { selectedPlaylist } = useContext(
    SelectedPlaylistContext
  ) as SelectedPlaylistContextType;

  function handleSearch(event: ChangeEvent<HTMLInputElement>): void {
    setQuery(event.currentTarget.value);
  }

  const { data: searchResults } = useQuery({
    queryKey: ["search", debouncedQuery],
    queryFn: () => getSearchResults({ session, query: debouncedQuery }),
    enabled: debouncedQuery !== null && debouncedQuery !== "",
    staleTime: 5 * 60 * 1000,
  });

  function getRenderedResults() {
    if (
      populateWithPlaylist &&
      [
        "user-playlists" as ShuffleInputType,
        "all-playlists" as ShuffleInputType,
      ].includes(shuffleInput.type as ShuffleInputType)
    ) {
      return renderPlaylist(populateWithPlaylist as Playlist, app);
    } else if (!searchResults || !searchResults.items) {
      return shuffleInput.playlist
        ? renderPlaylist(shuffleInput.playlist as Playlist, app)
        : null;
    } else {
      return renderSearchResults(
        searchResults,
        selectedPlaylist as Playlist,
        query,
        app
      );
    }
  }

  let renderedResults = getRenderedResults();

  return (
    <section className="flex flex-col gap-16">
      <DashboardHeading text="Which playlist do you want to shuffle?" />
      <div className="flex flex-col gap-16 rounded-[16px] bg-tertiary p-16 pb-24">
        <SearchInput
          placeholder="Search for a playlist"
          className="w-full md:w-[40%] md:min-w-[400px]"
          onChange={handleSearch}
        />
        <DashboardShelf desktopBehavior={"grid"} className="py-2">
          {renderedResults}
        </DashboardShelf>
      </div>
    </section>
  );
}

function renderPlaylist(playlist: Playlist, app: Apps) {
  return (
    <PlaylistCard
      playlist={playlist}
      key={playlist.id}
      bgColor="secondary"
      className="h-full"
      app={app}
    />
  );
}

function renderSearchResults(
  searchResults:
    | SpotifyApi.PagingObject<SpotifyApi.PlaylistObjectSimplified>
    | undefined,
  selectedPlaylist: Playlist | null,
  query: string | null,
  app: Apps
) {
  if (searchResults === undefined) {
    return (
      <p className="text-body">
        No results found... Try searching for something new.
      </p>
    );
  }

  if (searchResults.total === 0) {
    return <p className="text-body">No results found for "{query}"</p>;
  }

  // If a playlist has been selected and the user is changing the query, show the playlist first before any query result
  if (
    selectedPlaylist !== null &&
    !searchResults.items.includes(selectedPlaylist)
  ) {
    searchResults.items = [
      selectedPlaylist,
      ...searchResults.items.filter(
        (playlist) => playlist !== selectedPlaylist
      ),
    ];
  }

  return searchResults.items.map((playlist) =>
    renderPlaylist(playlist as Playlist, app)
  );
}
