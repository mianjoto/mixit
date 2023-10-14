"use client";

import SelectedPlaylistContext, {
  SelectedPlaylistContextType,
} from "@/contexts/selected-playlist-context";
import SpotifyContext, { SpotifyContextType } from "@/contexts/spotify-context";
import { Apps } from "@/types/apps";
import { useSession } from "next-auth/react";
import { useContext, useEffect, useState } from "react";
import AppDashboardHeading from "@/components/app-dashboard-heading";
import { AppFormPlaylistSearch } from "@/components/app-form-playlist-search";
import {
  PlaylistShuffleType,
  ShuffleInput,
  ShuffleInputType,
  ShuffleOutput,
  ShuffleOutputType,
} from "@/types/mixit";
import { ChooseShuffleInputForm } from "../../../components/choose-shuffle-input-form";
import { useShufflerApp } from "../../../../lib/mixit";
import spotifyApi from "../../../../lib/spotify-auth";
import { Button } from "@/components/ui/button";
import { ChooseShuffleOutputForm } from "@/components/choose-shuffle-output-form";

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

  let showChooseOutput =
    shuffleInput?.type === "liked-songs" || selectedPlaylist !== null;
  let showSearchInput =
    shuffleInput?.type === ("all-playlists" as PlaylistShuffleType);

  let isReadyToMix = false;
  if (shuffleInput?.type === "liked-songs") {
    if (shuffleOutput?.type !== undefined) {
      isReadyToMix = true;
    }
  } else if (
    shuffleInput?.playlist !== undefined &&
    shuffleOutput?.type !== undefined
  ) {
    isReadyToMix = true;
  }

  shuffleInput?.playlist !== undefined && shuffleOutput?.type !== undefined;

  return (
    <>
      <AppDashboardHeading app={app} />
      <ChooseShuffleInputForm
        handleShuffleInputFn={handleShuffleInput}
        app={app}
      />

      {showSearchInput && (
        <AppFormPlaylistSearch
          session={session!}
          app={app}
          shuffleInput={shuffleInput!}
        />
      )}

      {showChooseOutput && (
        <ChooseShuffleOutputForm
          handleShuffleOutput={handleShuffleOutput}
          app={app}
          user={user}
          shuffleInput={shuffleInput}
        />
      )}

      {isReadyToMix && (
        <Button
          size="cta"
          willRedirect={false}
          onClick={() =>
            useShufflerApp(
              { input: shuffleInput!, output: shuffleOutput! },
              session!
            )
          }
        >
          Mix now
        </Button>
      )}
    </>
  );
}
