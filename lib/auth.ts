import { NextAuthOptions } from "next-auth";
import SpotifyProvider from "next-auth/providers/spotify";
import { LOGIN_URL } from "./spotify";

export const authConfig: NextAuthOptions = {
  providers: [
    SpotifyProvider({
      clientId: process.env.SPOTIFY_CLIENT_ID as string,
      clientSecret: process.env.SPOTIFY_CLIENT_SECRET as string,
      authorization: LOGIN_URL,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
};
