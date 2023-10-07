import React from "react";
import { DashboardCard } from "./dashboard-card";
import { Apps } from "@/types/apps";
import { cn, getTextColorFromApp } from "../../lib/utils";
import { LikedSongsIcon, PlaylistIcon } from "@/assets/svg";

type AppFormCardRootProps = {
  title: string;
  description: string;
  image: string | React.JSX.Element;
  app: Apps;
};

const AppFormCardRoot = ({
  title,
  description,
  image,
  app,
}: AppFormCardRootProps) => {
  const imageWithColor = getImageWithAccentColor(image, app);

  return (
    <DashboardCard
      title={title}
      description={description}
      image={imageWithColor}
      noClickBehavior
      showFullDescription
    />
  );
};

type AppFormCardProps = {
  app: Apps;
};

const LikedSongs = ({ app }: AppFormCardProps) => {
  return (
    <AppFormCardRoot
      title="Liked Songs"
      description="Your collection of your liked songs"
      image={<LikedSongsIcon className="h-[40%] w-[40%]" />}
      app={app}
    />
  );
};

const Playlists = ({ app }: AppFormCardProps) => {
  return (
    <AppFormCardRoot
      title="Playlist"
      description="Can be yours or any playlist on Spotify"
      image={<PlaylistIcon className="h-[70%] w-[70%]" />}
      app={app}
    />
  );
};

function getImageWithAccentColor(
  image: string | React.JSX.Element,
  app: Apps
): string | React.JSX.Element {
  // If image is a statically imported jpg image, return the image
  if (typeof image === "string") {
    return image;
  }

  // Otherwise, set the icon color to the associated color of the app
  const iconTextColorClass = getTextColorFromApp(app);

  return (
    <div
      className={cn(
        iconTextColorClass,
        "flex min-h-full min-w-full content-center items-center justify-center bg-background"
      )}
    >
      {image}
    </div>
  );
}

export const AppFormCard = AppFormCardRoot as typeof AppFormCardRoot & {
  LikedSongsCard: typeof LikedSongs;
  PlaylistCard: typeof Playlists;
};
AppFormCardRoot.LikedSongs = LikedSongs;
AppFormCardRoot.Playlists = Playlists;
