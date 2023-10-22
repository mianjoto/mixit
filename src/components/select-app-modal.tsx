"use client";

import useSelectAppModal from "@/hooks/useSelectAppModal";
import React, { useContext } from "react";
import Modal from "./modal";
import ListenOnSpotifyButton from "./listen-on-spotify-button";
import { AppData } from "@/data/records/apps";
import { Apps } from "@/types/apps";
import { AppIcon, AppIconShapes } from "./ui/app-icon";
import { DashboardCard } from "./dashboard-card";
import { getPlaylistCoverImage } from "@/../lib/utils";
import SelectedPlaylistContext, {
  SelectedPlaylistContextType,
} from "@/contexts/selected-playlist-context";
import { useRouter } from "next/navigation";

const SelectAppModal = () => {
  const router = useRouter();
  const { onClose, isOpen, playlist } = useSelectAppModal();
  const { setSelectedPlaylist } = useContext(
    SelectedPlaylistContext
  ) as SelectedPlaylistContextType;

  const onChange = (open: boolean) => {
    if (!open) {
      onClose();
    }
  };

  if (!playlist) {
    return (
      <Modal
        title="Something went wrong!"
        description="Please try again."
        isOpen={isOpen}
        onChange={onChange}
      >
        <></>
      </Modal>
    );
  }

  const handleAppClick = (href: string) => {
    setSelectedPlaylist(playlist);
    router.push(href);
    onClose();
  };

  return (
    <Modal
      title="How do you want to mix?"
      description="Select an app or listen on Spotify"
      isOpen={true}
      onChange={onChange}
    >
      <article className="flex w-3/4 flex-col items-center gap-24 md:w-auto md:flex-row md:items-start">
        <DashboardCard
          title={playlist.name}
          description={playlist.description}
          image={getPlaylistCoverImage(playlist)?.url}
          noClickBehavior
          className="w-full max-w-[300px] bg-secondary md:h-full md:w-full md:max-w-none"
        />
        <aside className="flex w-full flex-col gap-20">
          <div className="flex w-full flex-col gap-8">
            {Object.values(AppData).map((app) => {
              return (
                <button
                  onClick={() => handleAppClick(app.href)}
                  className="flex w-full flex-row items-center gap-16 rounded-[18px] bg-secondary/50 px-12 py-8 transition-all duration-300 hover:bg-secondary md:gap-16"
                  key={app.name}
                >
                  <AppIcon
                    app={app.appType as Apps}
                    shape={AppIconShapes.SoftSquare}
                    className="h-[50px] w-[50px] text-background md:h-[60px] md:w-[60px]"
                  />
                  <div className="flex w-full flex-col gap-[6px] text-left">
                    <h2 className="text-base font-bold uppercase leading-none text-body">
                      {app.name}
                    </h2>
                    <p className="text-sm font-medium text-gray">
                      {app.shortDescription}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
          <ListenOnSpotifyButton playlist={playlist} className="w-full" />
        </aside>
      </article>
    </Modal>
  );
};

export default SelectAppModal;
