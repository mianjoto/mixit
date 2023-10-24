import { signIn } from "next-auth/react";
import getUrl from "../../lib/utils";
import SpotifyButton from "./ui/spotify-button";

const SpotifySignInButton = () => {
  const callbackUrl = getUrl("/dashboard");

  const handleSignIn = () => {
    signIn("spotify", {
      redirect: false,
      callbackUrl: callbackUrl,
    });
  };

  return (
    <SpotifyButton onClick={handleSignIn}>Log in with Spotify</SpotifyButton>
  );
};

export default SpotifySignInButton;
