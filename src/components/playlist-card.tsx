import useAuthModal from "@/hooks/useAuthModal";
import { DashboardCard } from "./dashboard-card";
import { cleanPlaylistAttributes } from "../../lib/utils";

interface PlaylistCardProps {
  playlist: SpotifyApi.PlaylistObjectSimplified | undefined | null;
}

const PlaylistCard = ({ playlist }: PlaylistCardProps) => {
  const authModal = useAuthModal();

  if (playlist === null) {
    return renderPlaceholderCard(authModal.onOpen);
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

const renderPlaceholderCard = (onClickFn: () => void): React.JSX.Element => {
  const placeholderData = {
    title: "Playlist title",
    description: "Playlist description",
    image: (
      <div className="h-full w-full place-content-center bg-secondary text-center text-sm text-body">
        No playlist found
      </div>
    ),
    onClick: onClickFn,
  };

  return <DashboardCard {...placeholderData} />;
};
export default PlaylistCard;
