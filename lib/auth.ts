import { NextAuthOptions } from "next-auth";
import SpotifyProvider from "next-auth/providers/spotify";
import spotifyApi, { LOGIN_URL } from "./spotify-auth";
import { JWT } from "next-auth/jwt";

interface Token extends JWT {
  username: string;
  accessToken: string;
  refreshToken: string;
  accessTokenExpires: number;
}

export async function refreshAccessToken(token: Token) {
  console.log("Spotify token=", token);
  try {
    spotifyApi.setAccessToken(token.accessToken);
    spotifyApi.setRefreshToken(token.refreshToken);

    const { body: refreshedToken } = await spotifyApi.refreshAccessToken();
    console.log("Successfully refreshed spotify access token");
    console.log(
      "Spotify refresh token after being refreshed=",
      refreshedToken.refresh_token
    );

    return {
      ...token,
      accessToken: refreshedToken.access_token,
      accessTokenExpires: Date.now() + refreshedToken.expires_in * 1000,
      refreshToken: refreshedToken.refresh_token ?? token.refreshToken,
      error: null,
    };
  } catch (error) {
    console.error(error);

    return {
      ...token,
      error: "RefreshAccessTokenError",
    };
  }
}

export const authConfig: NextAuthOptions = {
  providers: [
    SpotifyProvider({
      clientId: process.env.SPOTIFY_CLIENT_ID as string,
      clientSecret: process.env.SPOTIFY_CLIENT_SECRET as string,
      authorization: LOGIN_URL,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ token, account, user }) {
      // Initial sign in
      if (account && user) {
        return {
          ...token,
          accessToken: account.access_token,
          refreshToken: account.refresh_token,
          username: account.providerAccountId,
          accessTokenExpires: (account?.expires_at as number) * 1000,
        } as Token;
      }

      // Return previous token if access token is valid
      if (Date.now() < (token as Token).accessTokenExpires) {
        console.log("Existing Spotify API access token is valid");
        return token as Token;
      }

      // Access token is expired, refresh
      console.log("Spotify API access token has expired, refreshing...");
      return await refreshAccessToken(token as Token);
    },

    async session({ session, token }) {
      session.accessToken = (token as Token).accessToken;
      session.refreshToken = (token as Token).refreshToken;
      session.user.name = (token as Token).name;

      return session;
    },
  },
};
