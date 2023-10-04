import useAuthModal from "@/hooks/useAuthModal";
import { DashboardCard } from "./dashboard-card";
import { cleanPlaylistAttributes } from "../../lib/utils";
import PlaylistCardPlaceholder from "./playlist-card-placeholder";
import { MusicIcon } from "@/assets/svg";
import { Playlist } from "../../lib/spotify-query";

interface PlaylistCardProps {
  playlist: Playlist | undefined | null;
}

const PlaylistCard = ({ playlist }: PlaylistCardProps) => {
  const authModal = useAuthModal();

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

function getImageFromPlaylist(playlist: Playlist) {
  if (playlist.images.length > 0) {
    return playlist.images[0]?.url;
  }

  return (
    <div className="flex h-full w-full content-center items-center justify-center bg-secondary text-body/50">
      <MusicIcon className="h-80 w-80" />
    </div>
  );
}

export default PlaylistCard;
