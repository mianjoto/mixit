import "../assets/css/index.css";
import { Noto_Sans } from "next/font/google";
import ModalProvider from "../providers/modal-provider";
import ReactQueryProvider from "@/providers/react-query-provider";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "@/components/ui/toaster";
import SelectedPlaylistProvider from "@/providers/selected-playlist-provider";
import VisitEventHandler from "@/components/visit-event-handler";

const notoSans = Noto_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export const metadata = {
  title: "Mixit",
  description: "Your new home for shuffling Spotify playlists and queues",
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <ReactQueryProvider>
        <SelectedPlaylistProvider>
          <ModalProvider />
          <VisitEventHandler />
          <body
            className={`${notoSans.className}
          w-screen overflow-x-hidden overscroll-none bg-background`}
          >
            {children}
            <Toaster />
          </body>
        </SelectedPlaylistProvider>
      </ReactQueryProvider>
    </html>
  );
};

export default RootLayout;
