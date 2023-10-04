import useAuthModal from "@/hooks/useAuthModal";
import { DashboardCard } from "./dashboard-card";
import { cleanPlaylistAttributes } from "../../lib/utils";
import PlaylistCardPlaceholder from "./playlist-card-placeholder";

interface PlaylistCardProps {
  playlist: SpotifyApi.PlaylistObjectSimplified | undefined | null;
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

  return (
    <DashboardCard
      title={playlist?.name}
      description={playlist?.description as string}
      image={playlist?.images[0]?.url}
      onClick={() => "/404-not-implemented"}
      key={playlist?.id}
    />
  );
};

export default PlaylistCard;
