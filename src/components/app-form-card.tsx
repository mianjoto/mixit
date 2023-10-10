import React, { useContext } from "react";
import { DashboardCard } from "./dashboard-card";
import { Apps } from "@/types/apps";
import { cn, getTextColorFromApp } from "../../lib/utils";
import {
  LikedSongsIcon,
  PlaylistIcon,
  ShufflePlaylistIcon,
} from "@/assets/svg";
import * as ToggleGroup from "@radix-ui/react-toggle-group";
import { Playlist } from "@/types/spotify";
import { ShuffleInput, ShuffleOutput } from "@/types/mixit";

type AppFormCardRootProps = {
  title: string;
  description: string;
  image: string | React.JSX.Element;
  app: Apps;
  disabled?: boolean;
  className?: string;
  value: ShuffleInput | ShuffleOutput;
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
  disabled = false,
  className,
  value,
}: AppFormCardRootProps) => {
  const imageWithColor = getImageWithAccentColor(image, app);
  const ringColor = COLOR_VARIANTS[app];
  const ringClass = !disabled
    ? "ring-inset data-[state=off]:ring-0 data-[state=on]:ring-4"
    : "";

  return (
    <ToggleGroup.Item
      value={value.type}
      className={cn(ringColor, ringClass, `rounded-[18px] `)}
    >
      <DashboardCard
        title={title}
        description={description}
        image={imageWithColor}
        className={cn("m-4 min-h-[96%] md:min-w-[240px]", className)}
        noClickBehavior
        showFullTitle
      />
    </ToggleGroup.Item>
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
      value={{ type: "liked-songs" } as ShuffleInput}
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
      value={{ type: "all-playlists" } as ShuffleInput}
    />
  );
};

const CreateNewPlaylist = ({ app }: AppFormCardProps) => {
  return (
    <AppFormCardRoot
      title="Create new playlist"
      description=""
      image={<PlaylistIcon className="h-[70%] w-[70%]" />}
      app={app}
      value={{ type: "new-playlist" } as ShuffleOutput}
    />
  );
};

type ChangeSongOrderProps = {
  user: SpotifyApi.CurrentUsersProfileResponse;
  shuffleInput: ShuffleInput;
} & AppFormCardProps;

const ChangeSongOrder = ({ app, user, shuffleInput }: ChangeSongOrderProps) => {
  let { disabled, reasonForDisabling } = determineWhetherButtonIsDisabled(
    shuffleInput,
    user
  );

  const radioValue: ShuffleOutput = {
    type: "song-order",
    disabled,
    reasonForDisabling,
  };

  return (
    <>
      <AppFormCardRoot
        title={"Change song order"}
        description={""}
        image={<ShufflePlaylistIcon className="h-[70%] w-[70%]" />}
        app={app}
        value={radioValue}
        disabled={disabled}
        className={disabled ? "cursor-not-allowed opacity-50" : ""}
      />
    </>
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

function determineWhetherButtonIsDisabled(
  shuffleInput: ShuffleInput,
  user: SpotifyApi.CurrentUsersProfileResponse
) {
  let disabled = false;
  let reasonForDisabling = undefined;

  // Disable button if user is shuffling liked songs
  if (shuffleInput.type === "liked-songs") {
    disabled = true;
    reasonForDisabling =
      "You cannot change the song order of your Liked Songs.";
  }

  // Disable button if the user does not have permission to change the song order
  const userOwnsPlaylist =
    (shuffleInput?.playlist as Playlist)?.owner.id === user.id;

  if (!userOwnsPlaylist && shuffleInput?.playlist !== undefined) {
    disabled = true;
    reasonForDisabling =
      "You do not own the playlist, so you cannot change the song order of this playlist. You can create a copy of this playlist and try again.";
  }
  return { disabled, reasonForDisabling };
}

export const AppFormCard = AppFormCardRoot as typeof AppFormCardRoot & {
  LikedSongs: typeof LikedSongs;
  Playlist: typeof Playlists;
  NewPlaylist: typeof CreateNewPlaylist;
  ChangeSongOrder: typeof ChangeSongOrder;
};
AppFormCardRoot.LikedSongs = LikedSongs;
AppFormCardRoot.Playlists = Playlists;
AppFormCardRoot.CreateNewPlaylist = CreateNewPlaylist;
AppFormCardRoot.ChangeSongOrder = ChangeSongOrder;
