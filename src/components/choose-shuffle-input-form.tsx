"use client";
import { AppFormCard } from "@/components/app-form-card";
import { DashboardShelf } from "@/components/dashboard-shelf";
import { Apps } from "@/types/apps";
import * as ToggleGroup from "@radix-ui/react-toggle-group";
import { DashboardHeading } from "./dashboard";
import { ShuffleInputType } from "@/types/spotify";

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
      <ToggleGroup.Root
        orientation="horizontal"
        asChild
        type="single"
        onValueChange={handleShuffleInputFn}
      >
        <DashboardShelf
          desktopBehavior={"shelf"}
          withSeparators
          className="py-2"
        >
          <AppFormCard.LikedSongs app={app} key={app} />
          <AppFormCard.Playlists app={app} key={app} />
        </DashboardShelf>
      </ToggleGroup.Root>
    </section>
  );
}
