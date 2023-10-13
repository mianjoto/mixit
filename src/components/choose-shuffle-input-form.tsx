"use client";
import { AppFormCard } from "@/components/app-form-card";
import { DashboardShelf } from "@/components/dashboard-shelf";
import { Apps } from "@/types/apps";
import * as ToggleGroup from "@radix-ui/react-toggle-group";
import { DashboardHeading } from "./dashboard";
import { ShuffleInputType } from "@/types/mixit";

type ChooseShuffleInputFormProps = {
  handleShuffleInputFn: (value: ShuffleInputType) => void;
  app: Apps;
};

export function ChooseShuffleInputForm({
  handleShuffleInputFn,
  app,
}: ChooseShuffleInputFormProps) {
  return (
    <section className="flex flex-col gap-16">
      <DashboardHeading text={"What would you like to shuffle?"} />
      <DashboardShelf desktopBehavior={"shelf"} withSeparators className="py-2">
        <ToggleGroup.Root
          orientation="horizontal"
          type="single"
          onValueChange={handleShuffleInputFn}
          asChild
        >
          <>
            <AppFormCard.LikedSongs
              app={app}
              key={`liked-songs-input-for-${app}`}
            />
            <AppFormCard.Playlists
              app={app}
              key={`playlists-input-for-${app}`}
            />
          </>
        </ToggleGroup.Root>
      </DashboardShelf>
    </section>
  );
}
