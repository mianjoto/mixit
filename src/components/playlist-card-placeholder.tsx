import playlistPlaceholderImage from "../../src/assets/images/playlist-card-image-placeholder.jpg";
import Image from "next/image";
import { DashboardCard } from "./dashboard-card";

const PLAYLIST_PLACEHOLDER_PROPS = {
  title: null,
  description: null,
  image: (
    <Image
      src={playlistPlaceholderImage}
      alt=""
      placeholder="blur"
      className="h-full w-full"
    />
  ),
};

const PlaylistCardPlaceholder = () => {
  return <DashboardCard {...PLAYLIST_PLACEHOLDER_PROPS} />;
};

export default PlaylistCardPlaceholder;
