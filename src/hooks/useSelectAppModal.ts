import { Playlist } from "@/types/spotify";
import { create } from "zustand";

interface SelectAppModalStore {
  isOpen: boolean;
  playlist: Playlist | undefined;
  onOpen: (playlist: Playlist | undefined) => void;
  onClose: () => void;
}

const useSelectAppModal = create<SelectAppModalStore>((set) => ({
  isOpen: false,
  playlist: undefined,
  onOpen: (playlist) => set({ isOpen: true, playlist: playlist as Playlist }),
  onClose: () => set({ isOpen: false, playlist: undefined }),
}));

export default useSelectAppModal;
