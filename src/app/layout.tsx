import "../assets/css/index.css";
import { Noto_Sans } from "next/font/google";
import ModalProvider from "../providers/modal-provider";

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
      <ModalProvider />
      <body
        className={`${notoSans.className}
        w-screen overflow-x-hidden bg-background`}
      >
        {children}
      </body>
    </html>
  );
};

export default RootLayout;
