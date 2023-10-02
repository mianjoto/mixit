import { useEffect, useState } from "react";
import { signIn, useSession } from "next-auth/react";
import SpotifyWebApi from "spotify-web-api-node";
import spotifyApi from "../../lib/spotify-auth";

const useSpotify = () => {
  const { data: session } = useSession();
  const [spotify, setSpotify] = useState<SpotifyWebApi>(spotifyApi);

  useEffect(() => {
    if (session) {
      // if refresh access token attempt fails, redirect user to login...
      if (session?.error === "RefreshAccessTokenError") {
        signIn("spotify");
      }
      spotifyApi.setAccessToken(session.accessToken);
      setSpotify(spotifyApi);
    }
  }, [session]);

  return spotify;
};

export default useSpotify;
