import { DashboardCard } from "./dashboard-card";
import {
  cleanPlaylistAttributes,
  getSmallestImageFromArray,
} from "../../lib/utils";
import PlaylistCardPlaceholder from "./playlist-card-placeholder";
import { Playlist } from "../../lib/spotify-query";
import { MusicIcon } from "@/assets/svg";

interface PlaylistCardProps {
  playlist: Playlist | undefined | null;
}

const PlaylistCard = ({ playlist }: PlaylistCardProps) => {
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

  return (
    <DashboardCard
      title={playlist?.name}
      description={playlist?.description as string}
      image={image}
      onClick={() => "/404-not-implemented"}
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
    return getSmallestImageFromArray(playlist.images).url;
  }

  return IMAGE_PLACEHOLDER;
}

export default PlaylistCard;
