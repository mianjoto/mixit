import { AppFormCard } from "@/components/app-form-card";
import { DashboardShelf } from "@/components/dashboard-shelf";
import { Apps } from "@/types/apps";
import * as ToggleGroup from "@radix-ui/react-toggle-group";
import { DashboardHeading } from "./dashboard";
import { ShuffleInput, ShuffleInputType } from "@/types/mixit";
import { Playlist } from "@/types/spotify";
import { SelectedPlaylistType } from "@/contexts/selected-playlist-context";
import { useEffect, useState } from "react";

type ChooseShuffleInputFormProps = {
  handleShuffleInputFn: (value: ShuffleInputType) => void;
  shuffleInput: ShuffleInput | undefined;
  selectedPlaylistFromDashboard: SelectedPlaylistType;
  app: Apps;
};

export function ChooseShuffleInputForm({
  handleShuffleInputFn,
  shuffleInput,
  selectedPlaylistFromDashboard,
  app,
}: ChooseShuffleInputFormProps) {
  const [value, setValue] = useState<string | "">("");

  useEffect(() => {
    shuffleInput?.type !== undefined && selectedPlaylistFromDashboard !== null
      ? setValue(shuffleInput.type as string)
      : null;
  }, [selectedPlaylistFromDashboard]);

  return (
    <section className="flex flex-col gap-16">
      <DashboardHeading text={"What would you like to shuffle?"} />
      <DashboardShelf desktopBehavior={"shelf"} withSeparators className="py-2">
        <ToggleGroup.Root
          orientation="horizontal"
          type="single"
          value={value}
          onValueChange={(value: string) => {
            handleShuffleInputFn(value as ShuffleInputType);
            setValue(value);
          }}
          asChild
        >
          <>
            <AppFormCard.LikedSongs
              app={app}
              key={`liked-songs-input-for-${app}`}
              isSelected={value === "liked-songs"}
            />
            <AppFormCard.Playlists
              app={app}
              key={`playlists-input-for-${app}`}
              isSelected={value === "all-playlists"}
            />
          </>
        </ToggleGroup.Root>
      </DashboardShelf>
    </section>
  );
}
