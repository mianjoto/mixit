import { Playlist } from "@/types/spotify";
import SpotifyButton from "./ui/spotify-button";
import { useRouter } from "next/navigation";
import { MouseEvent } from "react";

type ListenOnSpotifyButtonProps = {
  playlist: Playlist;
  className?: string;
};

const ListenOnSpotifyButton = ({
  playlist,
  className,
}: ListenOnSpotifyButtonProps) => {
  const router = useRouter();

  const handleRedirectToSpotify = (e: MouseEvent) => {
    e.preventDefault();
    router.push(playlist.uri);
  };

  return (
    <SpotifyButton
      onClick={(e) => handleRedirectToSpotify(e)}
      className={className}
    >
      Listen on Spotify
    </SpotifyButton>
  );
};

export default ListenOnSpotifyButton;
