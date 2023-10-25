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
import InfoTooltip, {
  InfoTooltipProps,
  InfoTooltipContent,
} from "./ui/info-tooltip";

type AppFormCardRootProps = {
  title: string;
  description: string;
  image: string | React.JSX.Element;
  app: Apps;
  defaultSelected?: boolean;
  disabled?: { isDisabled: boolean; reasonForDisabling: string };
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
  defaultSelected = false,
  disabled = undefined,
  className,
  value,
}: AppFormCardRootProps) => {
  const imageWithColor = getImageWithAccentColor(image, app);
  const ringColor = COLOR_VARIANTS[app];
  const ringClass = !disabled
    ? "ring-inset data-[state=off]:ring-0 data-[state=on]:ring-4"
    : "";

  const toggleIsDisabled = (value as ShuffleOutput)?.disabled;
  const toggleValue = value.type === null ? "" : (value.type as string);
  const tooltipContent =
    disabled !== undefined
      ? ({ description: disabled.reasonForDisabling } as InfoTooltipContent)
      : null;

  const card = (
    <DashboardCard
      title={title}
      description={description}
      image={imageWithColor}
      className={cn("m-4 min-h-[96%] md:min-w-[240px]", className)}
      noClickBehavior
      showFullTitle
      disabled={toggleIsDisabled}
      tooltipContent={tooltipContent}
      key={`${title}-${description}-dashboard-card-component`}
    />
  );

  if (disabled) {
    return card;
  }

  return (
    <ToggleGroup.Item
      value={toggleValue}
      defaultChecked={defaultSelected}
      disabled={toggleIsDisabled ?? toggleIsDisabled}
      className={cn(ringColor, ringClass, `rounded-[18px] `)}
      key={`${title}-${description}-dashboard-card-toggle-group-item`}
    >
      {card}
    </ToggleGroup.Item>
  );
};

type AppFormCardProps = {
  app: Apps;
} & Pick<AppFormCardRootProps, "defaultSelected">;

const LikedSongs = ({ app, defaultSelected }: AppFormCardProps) => {
  return (
    <AppFormCardRoot
      title="Liked Songs"
      description="Your collection of your liked songs"
      image={<LikedSongsIcon className="h-[40%] w-[40%]" />}
      app={app}
      value={{ type: "liked-songs" } as ShuffleInput}
      key={"liked-songs-input-for-" + app}
      defaultSelected={defaultSelected}
    />
  );
};

const Playlists = ({ app, defaultSelected }: AppFormCardProps) => {
  return (
    <AppFormCardRoot
      title="Playlist"
      description="Can be yours or any playlist on Spotify"
      image={<PlaylistIcon className="h-[70%] w-[70%]" />}
      app={app}
      value={{ type: "all-playlists" } as ShuffleInput}
      key={"playlists-input-for-" + app}
      defaultSelected={defaultSelected}
    />
  );
};

const CreateNewPlaylist = ({ app, defaultSelected }: AppFormCardProps) => {
  return (
    <AppFormCardRoot
      title="Create new playlist"
      description=""
      image={<PlaylistIcon className="h-[70%] w-[70%]" />}
      app={app}
      value={{ type: "new-playlist" } as ShuffleOutput}
      defaultSelected={defaultSelected}
    />
  );
};

type ChangeSongOrderProps = {
  user: SpotifyApi.CurrentUsersProfileResponse;
  shuffleInput: ShuffleInput;
} & AppFormCardProps;

const ChangeSongOrder = ({
  app,
  user,
  shuffleInput,
  defaultSelected,
}: ChangeSongOrderProps) => {
  let { isDisabled, reasonForDisabling } = isChooseSongOrderOutputDisabled(
    shuffleInput,
    user
  );

  const radioValue: ShuffleOutput = {
    type: "song-order",
    disabled: isDisabled,
    reasonForDisabling,
  };

  const tooltipInfo = isDisabled
    ? { isDisabled: true, reasonForDisabling: reasonForDisabling! }
    : undefined;

  return (
    <>
      <AppFormCardRoot
        title={"Change song order"}
        description={""}
        image={<ShufflePlaylistIcon className="h-[70%] w-[70%]" />}
        app={app}
        value={radioValue}
        disabled={tooltipInfo}
        key={"change=song-order-output-for-" + app}
        defaultSelected={defaultSelected}
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

export const LIKED_SONGS_SONG_ORDER_DISABLED_REASON =
  "You do not own the playlist, so you cannot change the song order of this playlist. You can create a copy of this playlist and try again.";
export const USER_NOT_OWNER_SONG_ORDER_DISABLED_REASON =
  "You cannot change the song order of your Liked Songs.";

export function isChooseSongOrderOutputDisabled(
  shuffleInput: ShuffleInput,
  user: SpotifyApi.CurrentUsersProfileResponse | undefined
) {
  let isDisabled = false;
  let reasonForDisabling = undefined;

  // Disable button if user is shuffling liked songs
  if (shuffleInput.type === "liked-songs") {
    isDisabled = true;
    reasonForDisabling = LIKED_SONGS_SONG_ORDER_DISABLED_REASON;
  }

  // Disable button if the user does not have permission to change the song order
  const userOwnsPlaylist =
    (shuffleInput?.playlist as Playlist)?.owner.id === user?.id;

  if (!userOwnsPlaylist && shuffleInput?.playlist !== undefined) {
    isDisabled = true;
    reasonForDisabling = USER_NOT_OWNER_SONG_ORDER_DISABLED_REASON;
  }
  return { isDisabled, reasonForDisabling };
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
