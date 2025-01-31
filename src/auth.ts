import NextAuth from "next-auth";
import Spotify from "next-auth/providers/spotify";
import { LOGIN_URL } from "../lib/spotify-auth";

export const { handlers, auth, signIn, signOut } = NextAuth({
    providers: [
        Spotify({
            authorization: LOGIN_URL,
        }),
    ],
});
