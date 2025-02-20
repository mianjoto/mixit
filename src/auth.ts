import NextAuth from "next-auth";
import Spotify from "next-auth/providers/spotify";
import { LOGIN_URL } from "../lib/spotify-auth";
import { assembleJWT, storeTokensInSession } from "../lib/auth";

export const { handlers, auth, signIn, signOut } = NextAuth({
    providers: [
        Spotify({
            authorization: LOGIN_URL,
        }),
    ],
    callbacks: {
        async jwt({ token, account, user }) {
            return await assembleJWT({ token, account, user });
        },
        session({ session, token }) {
            return storeTokensInSession({ session, token });
        },
    },
});
