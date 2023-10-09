import React from "react";
import { DashboardCard } from "./dashboard-card";
import { Apps } from "@/types/apps";
import { cn, getTextColorFromApp } from "../../lib/utils";
import { LikedSongsIcon, PlaylistIcon, QueueIcon } from "@/assets/svg";
import * as ToggleGroup from "@radix-ui/react-toggle-group";

type AppFormCardRootProps = {
  title: string;
  description: string;
  image: string | React.JSX.Element;
  app: Apps;
  value: string;
};

/** Since these ring-color classes aren't explicitly used in other
 * parts of the project, we need to manually map explicit classes
 * so that Tailwind can compile these styles
 */
const COLOR_VARIANTS = {
  [Apps.Shuffler]: "ring-accent-1",
  [Apps.Blender]: "ring-accent-2",
  [Apps.PickAndMix]: "ring-accent-3",
  [Apps.TimeMachine]: "ring-accent-4",
};

const AppFormCardRoot = ({
  title,
  description,
  image,
  app,
  value,
}: AppFormCardRootProps) => {
  const imageWithColor = getImageWithAccentColor(image, app);
  const ringColor = COLOR_VARIANTS[app];

  const card = (
    <DashboardCard
      title={title}
      description={description}
      image={imageWithColor}
      className="m-4 min-h-[96%] md:min-w-[240px]"
      noClickBehavior
    />
  );

  return (
    <ToggleGroup.Item
      value={value}
      className={cn(
        ringColor,
        `rounded-[18px] ring-inset data-[state=off]:ring-0 data-[state=on]:ring-4`
      )}
    >
      {card}
    </ToggleGroup.Item>
  );
};

type AppFormCardProps = {
  app: Apps;
};

export type ShuffleInput =
  | "liked-songs"
  | "all-playlists"
  | "user-playlists"
  | "queue";

const LikedSongs = ({ app }: AppFormCardProps) => {
  return (
    <AppFormCardRoot
      title="Liked Songs"
      description="Your collection of your liked songs"
      image={<LikedSongsIcon className="h-[40%] w-[40%]" />}
      app={app}
      value={"liked-songs" as ShuffleInput}
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
      value={"all-playlists" as ShuffleInput}
    />
  );
};

const Queue = ({ app }: AppFormCardProps) => {
  return (
    <AppFormCardRoot
      title="Queue"
      description="Your upcoming songs"
      image={<QueueIcon className="h-[50%] w-[50%]" />}
      app={app}
      value={"queue" as ShuffleInput}
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
  QueueCard: typeof Queue;
};
AppFormCardRoot.LikedSongs = LikedSongs;
AppFormCardRoot.Playlists = Playlists;
AppFormCardRoot.Queue = Queue;
