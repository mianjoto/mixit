"use client";
import AppDashboardHeading from "@/components/app-dashboard-heading";
import { Apps } from "@/types/apps";
import { AppFormCard } from "@/components/app-form-card";
import { DashboardHeading } from "../../../components/dashboard";
import { DashboardShelf } from "@/components/dashboard-shelf";
import Separator from "@/components/ui/separator";

export default function Shuffler() {
  const app = Apps.Shuffler;
  return (
    <>
      <AppDashboardHeading app={app} />
      <section className="flex flex-col gap-16">
        <DashboardHeading text={"What would you like to shuffle?"} />
        <DashboardShelf desktopBehavior={"shelf"}>
          <AppFormCard.LikedSongs app={app} />
          <AppFormCard.Playlists app={app} />
        </DashboardShelf>
      </section>
    </>
  );
}
