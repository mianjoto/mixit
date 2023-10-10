"use client";

import SelectedPlaylistContext, {
  SelectedPlaylistContextType,
} from "@/contexts/selected-playlist-context";
import SpotifyContext, { SpotifyContextType } from "@/contexts/spotify-context";
import { Apps } from "@/types/apps";
import * as ToggleGroup from "@radix-ui/react-toggle-group";
import { useSession } from "next-auth/react";
import { useContext, useEffect, useState } from "react";
import AppDashboardHeading from "@/components/app-dashboard-heading";
import { AppFormPlaylistSearch } from "@/components/app-form-playlist-search";
import { AppFormShuffleOutput } from "@/components/app-form-shuffle-output";
import {
  PlaylistShuffleType,
  ShuffleInput,
  ShuffleInputType,
  ShuffleOutput,
  ShuffleOutputType,
} from "@/types/spotify";
import { ChooseShuffleInputForm } from "../../../components/choose-shuffle-input-form";

export default function Shuffler() {
  const [shuffleInput, setShuffleInput] = useState<ShuffleInput | null>(null);
  const [shuffleOutput, setShuffleOutput] = useState<ShuffleOutput | null>(
    null
  );

  const { user } = useContext(SpotifyContext) as SpotifyContextType;

  const { data: session } = useSession();
  const { selectedPlaylist, setSelectedPlaylist } = useContext(
    SelectedPlaylistContext
  ) as SelectedPlaylistContextType;

  const app = Apps.Shuffler;

  function handleShuffleInput(value: ShuffleInputType): void {
    if (value === "liked-songs") {
      setShuffleInput({ type: "liked-songs", playlist: undefined });
      setSelectedPlaylist(null);
    } else {
      setShuffleInput({ type: value, playlist: undefined });
    }
  }

  function handleShuffleOutput(value: ShuffleOutputType): void {
    setShuffleOutput({ type: value });
  }

  // Whenever a new playlist is selected, store it in shuffleInput
  useEffect(() => {
    if (shuffleInput !== null) {
      const newShuffleInput = {
        type: shuffleInput.type,
        playlist: selectedPlaylist,
      } as ShuffleInput;
      setShuffleInput(newShuffleInput);
    }
  }, [selectedPlaylist]);

  const searchInput = (
    <AppFormPlaylistSearch
      session={session!}
      app={app}
      shuffleInput={shuffleInput!}
    />
  );
  const chooseOutput = (
    <ToggleGroup.Root
      orientation="horizontal"
      asChild
      type="single"
      onValueChange={handleShuffleOutput}
    >
      <AppFormShuffleOutput
        app={app}
        user={user!}
        shuffleInput={shuffleInput!}
      />
    </ToggleGroup.Root>
  );

  let showChooseOutput =
    shuffleInput?.type === "liked-songs" || selectedPlaylist !== null;
  let showSearchInput =
    shuffleInput?.type === ("all-playlists" as PlaylistShuffleType);

  return (
    <>
      <AppDashboardHeading app={app} />
      <ChooseShuffleInputForm
        handleShuffleInputFn={handleShuffleInput}
        app={app}
      />

      {showSearchInput && searchInput}

      {showChooseOutput && chooseOutput}
    </>
  );
}
