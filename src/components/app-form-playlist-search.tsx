"use client";
import { useQuery } from "@tanstack/react-query";
import { Session } from "next-auth";
import { ChangeEvent, useEffect, useState } from "react";
import { Playlist, getSearchResults } from "../../lib/spotify-query";
import { DashboardHeading } from "./dashboard";
import { DashboardShelf } from "./dashboard-shelf";
import PlaylistCard from "./playlist-card";
import { useDebounce } from "@uidotdev/usehooks";
import { SearchInput } from "./ui/search-input";

type AppFormPlaylistSearchProps = {
  session: Session;
};

export function AppFormPlaylistSearch({ session }: AppFormPlaylistSearchProps) {
  const [query, setQuery] = useState<string | null>(null);
  const debouncedQuery = useDebounce(query, 250);

  function handleSearch(event: ChangeEvent<HTMLInputElement>): void {
    setQuery(event.currentTarget.value);
  }

  const { data: searchResults } = useQuery({
    queryKey: ["search", debouncedQuery],
    queryFn: () => getSearchResults({ session, query: debouncedQuery }),
    enabled: debouncedQuery !== null && debouncedQuery !== "",
    staleTime: 5 * 60 * 1000,
  });

  let renderedResults;

  if (!searchResults || !searchResults.items) {
    renderedResults = null;
  } else {
    if (searchResults.total > 0) {
      renderedResults = searchResults?.items.map((playlist: Playlist) => (
        <PlaylistCard
          playlist={playlist}
          key={playlist.id}
          bgColor="secondary"
          className="h-full"
        />
      ));
    } else {
      renderedResults = (
        <p className="text-body">No results found for "{query}"</p>
      );
    }
  }

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
