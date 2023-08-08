import "../assets/css/index.css";
import { Noto_Sans } from "next/font/google";

const notoSans = Noto_Sans({
  subsets: ["latin"],
  weight: "500",
});

export const metadata = {
  title: "Mixit",
  description: "Your new home for shuffling Spotify playlists and queues",
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <body
        className={`${notoSans.className} container flex flex-col bg-background px-3xl py-3xl`}
      >
        {children}
      </body>
    </html>
  );
};

export default RootLayout;
