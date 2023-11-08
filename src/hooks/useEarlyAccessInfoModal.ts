import { create } from "zustand";

interface EarlyAccessInfoStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useEarlyAccessInfoModal = create<EarlyAccessInfoStore>(function (set) {
  return {
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => {
      set({ isOpen: false });
    },
  };
});

export default useEarlyAccessInfoModal;
