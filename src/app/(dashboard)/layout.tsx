import { Session } from "next-auth";

import { DashboardRootLayout } from "@/components/dashboard";
import DashboardNavbarContent from "@/components/dashboard-navbar";
import { NextAuthSessionProvider } from "@/providers/next-auth-session-provider";
import { SkeletonTheme } from "react-loading-skeleton";
import SpotifyProvider from "@/providers/spotify-provider";
import SelectedPlaylistProvider from "@/providers/selected-playlist-provider";

const DashboardLayout = ({
  children,
  session,
}: {
  children: React.ReactNode;
  session: Session;
}) => {
  // baseColor refers to the same HEX code as colors.secondary in the config.tailwind.js
  const baseColor = "#292929";

  // baseColor refers to the same HEX code as colors.tertiary in the config.tailwind.js
  const highlightColor = "#141415";
  return (
    <NextAuthSessionProvider session={session}>
      <SpotifyProvider>
        <SelectedPlaylistProvider>
          <SkeletonTheme baseColor={baseColor} highlightColor={highlightColor}>
            <div className="flex flex-col md:flex-row">
              <DashboardNavbarContent />
              <DashboardRootLayout>{children}</DashboardRootLayout>
            </div>
          </SkeletonTheme>
        </SelectedPlaylistProvider>
      </SpotifyProvider>
    </NextAuthSessionProvider>
  );
};

export default DashboardLayout;
