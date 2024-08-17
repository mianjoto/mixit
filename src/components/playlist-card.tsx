import { MusicIcon } from "@/assets/svg";
import SelectedPlaylistContext, {
  SelectedPlaylistContextType,
} from "@/contexts/selected-playlist-context";
import useSelectAppModal from "@/hooks/useSelectAppModal";
import { Apps } from "@/types/apps";
import { Playlist } from "@/types/spotify";
import { useContext } from "react";
import {
  cleanPlaylistAttributes,
  cn,
  getPlaylistCoverImage,
  getRingColorFromApp,
} from "../../lib/utils";
import { DashboardCard } from "./dashboard-card";
import PlaylistCardPlaceholder from "./playlist-card-placeholder";

interface PlaylistCardProps {
  playlist: Playlist | undefined | null;
  app?: Apps | null;
  bgColor?: "secondary" | "tertiary";
  small?: boolean;
  showSelectAppModalOnClick?: boolean;
  noClickBehavior?: boolean;
  className?: string;
}

const PlaylistCard = ({
  playlist,
  app = null,
  bgColor,
  className,
  small = false,
  noClickBehavior = false,
  showSelectAppModalOnClick = false,
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

  const { selectedPlaylist, setSelectedPlaylist } = useContext(
    SelectedPlaylistContext
  ) as SelectedPlaylistContextType;

  const image = getImageFromPlaylist(playlist);
  const { onOpen: openSelectAppModal } = useSelectAppModal();

  const handlePlaylistClick = () => {
    if (noClickBehavior) {
      return;
    }

    // Show modal if modal selector
    if (showSelectAppModalOnClick) {
      openSelectAppModal(playlist);
      return;
    }

    // Enable toggling on and off
    if (selectedPlaylist !== playlist) {
      setSelectedPlaylist(playlist);
    } else {
      setSelectedPlaylist(null);
    }
  };

  // Highlight selected playlist with a ring
  if (selectedPlaylist === playlist) {
    let ringColor = "ring-body";
    if (app !== null) {
      ringColor = getRingColorFromApp(app);
    }
    className = cn(
      "ring-inset ring-4 transition duration-200",
      ringColor,
      className
    );
  }

  // Dim non-selected playlists
  if (selectedPlaylist !== playlist && selectedPlaylist !== null) {
    className = cn("opacity-50 transition duration-400", className);
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
      href={playlist?.external_urls.spotify}
      className={className}
      key={playlist?.id}
      withSpotifyLogo
    />
  );
};

const IMAGE_PLACEHOLDER = (
  <div className="flex min-h-full min-w-full content-center items-center justify-center bg-secondary text-body/50">
    <MusicIcon className="h-full w-full" />
  </div>
);

function getImageFromPlaylist(playlist: Playlist) {
  if (playlist.images?.length > 0) {
    return getPlaylistCoverImage(playlist)?.url;
  }

  return IMAGE_PLACEHOLDER;
}

export default PlaylistCard;
