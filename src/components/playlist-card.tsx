import { DashboardCard } from "./dashboard-card";
import {
  cleanPlaylistAttributes,
  cn,
  getPlaylistCoverImage,
  getRingColorFromApp,
} from "../../lib/utils";
import PlaylistCardPlaceholder from "./playlist-card-placeholder";
import { Playlist } from "../../lib/spotify-query";
import { MusicIcon } from "@/assets/svg";
import SelectedPlaylistContext, {
  SelectedPlaylistContextType,
} from "@/contexts/selected-playlist-context";
import { useContext } from "react";
import { Apps } from "@/types/apps";

interface PlaylistCardProps {
  playlist: Playlist | undefined | null;
  app?: Apps | null;
  bgColor?: "secondary" | "tertiary";
  small?: boolean;
  className?: string;
}

const PlaylistCard = ({
  playlist,
  app = null,
  bgColor,
  className,
  small = false,
}: PlaylistCardProps) => {
  if (playlist === null) {
    return <PlaylistCardPlaceholder />;
  }

  if (playlist === undefined) {
    return <DashboardCard.Loading />;
  }

  if (playlist !== undefined) {
    cleanPlaylistAttributes(playlist);
  }

  const image = getImageFromPlaylist(playlist);

  const { selectedPlaylist, setSelectedPlaylist } = useContext(
    SelectedPlaylistContext
  ) as SelectedPlaylistContextType;

  const handlePlaylistClick = () => {
    setSelectedPlaylist(playlist);
  };

  if (selectedPlaylist === playlist) {
    let ringColor = "ring-body";
    if (app !== null) {
      ringColor = getRingColorFromApp(app);
    }
    className = cn("ring-inset ring-4", ringColor, className);
  }

  return (
    <DashboardCard
      title={playlist?.name}
      description={playlist?.description as string}
      image={image}
      descriptionClamp="one-line"
      bgColor={bgColor}
      onClick={handlePlaylistClick}
      small={small}
      className={className}
      key={playlist?.id}
    />
  );
};

const IMAGE_PLACEHOLDER = (
  <div className="flex min-h-full min-w-full content-center items-center justify-center bg-secondary text-body/50">
    <MusicIcon className="h-full w-full" />
  </div>
);

function getImageFromPlaylist(playlist: Playlist) {
  if (playlist.images.length > 0) {
    return getPlaylistCoverImage(playlist)?.url;
  }

  return IMAGE_PLACEHOLDER;
}

export default PlaylistCard;
