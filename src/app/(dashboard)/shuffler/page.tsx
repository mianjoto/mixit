"use client";

import { AppFormPlaylistSearch } from "@/components/app-form-playlist-search";
import AppDashboardHeading from "@/components/app-dashboard-heading";
import { Apps } from "@/types/apps";
import { AppFormCard } from "@/components/app-form-card";
import { DashboardHeading } from "../../../components/dashboard";
import { DashboardShelf } from "@/components/dashboard-shelf";
import * as ToggleGroup from "@radix-ui/react-toggle-group";
import { useState } from "react";
import { ShuffleInput } from "../../../components/app-form-card";
import { SearchInput } from "@/components/ui/search-input";
import { useSession } from "next-auth/react";

export default function Shuffler() {
  const [shuffleInput, setShuffleInput] = useState<ShuffleInput | null>(null);
  const { data: session } = useSession();

  const app = Apps.Shuffler;

  function handleShuffleInput(value: string): void {
    const valueAsShuffleInput = value as ShuffleInput;
    setShuffleInput(valueAsShuffleInput);
  }

  return (
    <>
      <AppDashboardHeading app={app} />
      {/* Shuffle Input */}
      <section className="flex flex-col gap-16">
        <DashboardHeading text={"What would you like to shuffle?"} />
        <ToggleGroup.Root
          orientation="horizontal"
          asChild
          type="single"
          onValueChange={handleShuffleInput}
        >
          <DashboardShelf
            desktopBehavior={"shelf"}
            withSeparators
            className="py-2"
          >
            <AppFormCard.LikedSongs app={app} key={app} />
            <AppFormCard.Playlists app={app} key={app} />
            <AppFormCard.Queue app={app} key={app} />
          </DashboardShelf>
        </ToggleGroup.Root>
      </section>

      {shuffleInput === ("all-playlists" as ShuffleInput) ? (
        <AppFormPlaylistSearch session={session!} />
      ) : (
        ""
      )}
    </>
  );
}
