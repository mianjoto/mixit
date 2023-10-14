"use client";
import { Apps } from "@/types/apps";
import * as ToggleGroup from "@radix-ui/react-toggle-group";
import { ShuffleInput, ShuffleOutputType } from "@/types/mixit";
import { DashboardShelf } from "./dashboard-shelf";
import { AppFormCard } from "./app-form-card";
import { DashboardHeading } from "./dashboard";

type ChooseShuffleOutputFormProps = {
  handleShuffleOutput: (value: ShuffleOutputType) => void;
  app: Apps;
  user: SpotifyApi.CurrentUsersProfileResponse | undefined;
  shuffleInput: ShuffleInput | null;
};

export function ChooseShuffleOutputForm({
  handleShuffleOutput,
  app,
  user,
  shuffleInput,
}: ChooseShuffleOutputFormProps) {
  return (
    <ToggleGroup.Root
      orientation="horizontal"
      asChild
      type="single"
      onValueChange={handleShuffleOutput}
    >
      <section className="flex flex-col gap-16">
        <DashboardHeading text="How do you want to shuffle?" />
        <DashboardShelf desktopBehavior={"grid"} className="py-2">
          <AppFormCard.CreateNewPlaylist app={app} />
          <AppFormCard.ChangeSongOrder
            app={app}
            user={user!}
            shuffleInput={shuffleInput!}
          />
        </DashboardShelf>
      </section>
    </ToggleGroup.Root>
  );
}
