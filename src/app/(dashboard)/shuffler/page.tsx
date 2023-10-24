"use client";

import SelectedPlaylistContext, {
  SelectedPlaylistContextType,
  SelectedPlaylistType,
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
import { ChooseShuffleOutputForm } from "@/components/choose-shuffle-output-form";
import ChooseShuffleSettingsAndMix from "../../../components/choose-shuffle-settings-and-mix-form";

const NULL_SHUFFLE_INPUT: ShuffleInput = { type: null, playlist: undefined };
const NULL_SHUFFLE_OUTPUT: ShuffleOutput = {
  type: null,
  disabled: true,
  reasonForDisabling: undefined,
};

type ShuffleFormState = {
  showSearchInput: boolean;
  showShuffleOutput: boolean;
  showMixButton: boolean;
};

export default function Shuffler() {
  const [shuffleInput, setShuffleInput] = useState<
    ShuffleInput | typeof NULL_SHUFFLE_INPUT
  >(NULL_SHUFFLE_INPUT);
  const [shuffleOutput, setShuffleOutput] = useState<
    ShuffleOutput | typeof NULL_SHUFFLE_OUTPUT
  >(NULL_SHUFFLE_OUTPUT);
  const [selectedPlaylistFromDashboard, setSelectedPlaylistFromDashboard] =
    useState<SelectedPlaylistType>(null);

  const [formState, setFormState] = useState<ShuffleFormState | undefined>(
    undefined
  );

  const { user } = useContext(SpotifyContext) as SpotifyContextType;

  const { data: session } = useSession();
  const { selectedPlaylist, setSelectedPlaylist } = useContext(
    SelectedPlaylistContext
  ) as SelectedPlaylistContextType;

  const app = Apps.Shuffler;

  // Whenever a new playlist is selected, store it in shuffleInput
  useEffect(() => {
    if (shuffleInput !== NULL_SHUFFLE_INPUT && shuffleInput !== null) {
      const newShuffleInput = {
        type: shuffleInput.type,
        playlist: selectedPlaylist,
      } as ShuffleInput;
      setShuffleInput(newShuffleInput);
      return;
    }

    // If playlist was chosen in dashboard (which would cause a null shuffleInput), store in ShuffleInput
    if (selectedPlaylist && !formState?.showShuffleOutput) {
      setSelectedPlaylistFromDashboard(selectedPlaylist);
      setShuffleInput({
        type: "all-playlists",
        playlist: selectedPlaylist,
      });
    }
  }, [selectedPlaylist]);

  function handleShuffleInputChange(value: ShuffleInputType): void {
    if (
      (!value && !selectedPlaylistFromDashboard) ||
      (!value && selectedPlaylistFromDashboard && formState?.showShuffleOutput)
    ) {
      setShuffleInput(NULL_SHUFFLE_INPUT);
      setSelectedPlaylist(null);
      return;
    }

    // If playlist was chosen in dashboard (which would cause a null shuffleInput), store in ShuffleInput
    if (!value && selectedPlaylistFromDashboard) {
      setShuffleInput({
        type: "all-playlists",
        playlist: selectedPlaylistFromDashboard,
      });
      return;
    }

    if (value === "liked-songs") {
      setShuffleInput({ type: "liked-songs", playlist: undefined });
      setSelectedPlaylist(null);
    } else {
      setShuffleInput({ type: value, playlist: undefined });
    }

    setSelectedPlaylistFromDashboard(null);
  }

  function handleShuffleOutputChange(value: ShuffleOutputType): void {
    setShuffleOutput({ type: value });
  }

  // Determine what options should be visible depending on the form state
  const newFormState = {} as ShuffleFormState;
  useEffect(() => {
    // Hide remaining form if unselecting the ShuffleInput
    if (shuffleInput.type === null) {
      if (selectedPlaylistFromDashboard) {
        setSelectedPlaylistFromDashboard(null);
        setSelectedPlaylist(null);
      }
      // Reset selected playlist if previously chosen from dashboard
      newFormState.showSearchInput = false;
      newFormState.showShuffleOutput = false;
      newFormState.showMixButton = false;
      setFormState(newFormState);
      return;
    }

    if (
      selectedPlaylistFromDashboard !== null ||
      shuffleInput?.type ===
        ("all-playlists" as
          | PlaylistShuffleType
          | "user-playlists" as PlaylistShuffleType)
    ) {
      newFormState.showSearchInput = true;
    }

    if (shuffleInput?.type === "liked-songs" || selectedPlaylist !== null) {
      newFormState.showShuffleOutput = true;
    }

    if (shuffleInput?.type === "liked-songs") {
      if (shuffleOutput?.type) {
        newFormState.showMixButton = true;
      }
    } else if (
      shuffleInput?.playlist !== undefined &&
      shuffleOutput?.type !== undefined &&
      shuffleOutput?.disabled !== true
    ) {
      newFormState.showMixButton = true;
    }

    setFormState(newFormState);
  }, [shuffleInput, shuffleOutput]);

  return (
    <>
      <AppDashboardHeading app={app} />
      <ChooseShuffleInputForm
        handleShuffleInputFn={handleShuffleInputChange}
        shuffleInput={shuffleInput}
        selectedPlaylistFromDashboard={selectedPlaylistFromDashboard}
        app={app}
      />
      {formState?.showSearchInput && (
        <AppFormPlaylistSearch
          session={session!}
          app={app}
          shuffleInput={shuffleInput!}
          populateWithPlaylist={selectedPlaylistFromDashboard}
        />
      )}
      {formState?.showShuffleOutput && (
        <ChooseShuffleOutputForm
          handleShuffleOutput={handleShuffleOutputChange}
          app={app}
          user={user}
          shuffleInput={shuffleInput}
        />
      )}
      {formState?.showMixButton && (
        <ChooseShuffleSettingsAndMix
          app={app}
          session={session!}
          shuffleInput={shuffleInput}
          shuffleOutput={shuffleOutput}
        />
      )}
    </>
  );
}
