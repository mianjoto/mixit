import spotifyApi from "./spotify-auth";
import { JWT } from "next-auth/jwt";
import { Account, Session, User } from "@auth/core/types";
import { AdapterSession, AdapterUser } from "@auth/core/adapters";

interface HydratedToken extends JWT {
    username: string;
    accessToken: string;
    refreshToken: string;
    accessTokenExpires: number;
}

export async function refreshAccessToken(token: HydratedToken) {
    //console.log("Spotify token=", token);
    try {
        spotifyApi.setAccessToken(token.accessToken);
        spotifyApi.setRefreshToken(token.refreshToken);

        const { body: refreshedToken } = await spotifyApi.refreshAccessToken();
        //console.log("Successfully refreshed spotify access token");
        //console.log(
        //    "Spotify refresh token after being refreshed=",
        //    refreshedToken.refresh_token
        //);

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

export async function assembleJWT(params: {
    token: JWT;
    account: Account | null;
    user: User | AdapterUser;
}) {
    const { token, account, user } = params;

    // Initial sign in
    if (account && user) {
        return {
            ...token,
            accessToken: account.access_token,
            refreshToken: account.refresh_token,
            username: account.providerAccountId,
            accessTokenExpires: (account?.expires_at as number) * 1000,
        } as HydratedToken;
    }

    // Return previous token if access token is valid
    if (Date.now() < (token as HydratedToken).accessTokenExpires) {
        console.log("Existing Spotify API access token is valid");
        return token as HydratedToken;
    }

    // Access token is expired, refresh
    //console.log("Spotify API access token has expired, refreshing...");
    return await refreshAccessToken(token as HydratedToken);
}

type SessionCallbackSessionParam = {
    user: AdapterUser;
} & AdapterSession &
    Session;

export function storeTokensInSession(params: {
    session: SessionCallbackSessionParam;
    token: JWT;
}) {
    const { session, token } = params;

    session.accessToken = (token as HydratedToken).accessToken;
    session.refreshToken = (token as HydratedToken).refreshToken;
    session.user.name = (token as HydratedToken).name;

    return session;
}
