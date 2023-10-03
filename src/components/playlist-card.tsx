import Image from "next/image";
import playlistPlaceholderImage from "../../src/assets/images/playlist-card-image-placeholder.jpg";
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
  const placeholderProps = {
    title: null,
    description: null,
    image: (
      <Image
        src={playlistPlaceholderImage}
        alt=""
        width="200"
        height="200"
        placeholder="blur"
        className="h-full w-full"
      />
    ),
    onClick: onClickFn,
  };
  return <DashboardCard {...placeholderProps} />;
};
export default PlaylistCard;
