import NextAuth, { Account, DefaultSession } from "next-auth";

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    accessToken?: Account.access_token;
    refreshToken?: Account.refresh_token;
    user: {
      // Additional user props go in here
    } & DefaultSession["user"];
    error?: string;
  }
}
