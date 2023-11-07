import { create } from "zustand";
import { useLocalStorage } from "./useLocalStorage";

export const HAS_VIEWED_EARLY_ACCESS_INFO_STORAGE_KEY =
  "has-viewed-early-access-info-modal";

interface EarlyAccessInfoStore {
  isOpen: () => boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useEarlyAccessInfoModal = create<EarlyAccessInfoStore>((set) => ({
  isOpen: () => {
    const { getItem } = useLocalStorage(
      HAS_VIEWED_EARLY_ACCESS_INFO_STORAGE_KEY
    );
    return getItem() === undefined;
  },
  onOpen: () => set({ isOpen: () => true }),
  onClose: () => {
    set({ isOpen: () => false });
    const { setItem } = useLocalStorage(
      HAS_VIEWED_EARLY_ACCESS_INFO_STORAGE_KEY
    );
    setItem(true);
  },
}));

export default useEarlyAccessInfoModal;
