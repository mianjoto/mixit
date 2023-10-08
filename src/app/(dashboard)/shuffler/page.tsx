"use client";
import AppDashboardHeading from "@/components/app-dashboard-heading";
import { Apps } from "@/types/apps";
import { AppFormCard } from "@/components/app-form-card";
import { DashboardHeading } from "../../../components/dashboard";
import { DashboardShelf } from "@/components/dashboard-shelf";
import * as ToggleGroup from "@radix-ui/react-toggle-group";

export default function Shuffler() {
  const app = Apps.Shuffler;
  return (
    <>
      <AppDashboardHeading app={app} />
      <section className="flex flex-col gap-16">
        <DashboardHeading text={"What would you like to shuffle?"} />
        <ToggleGroup.Root orientation="horizontal" asChild type="single">
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
    </>
  );
}
