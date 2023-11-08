import { useLocalStorage } from "./useLocalStorage";

export const LAST_VISITED_AT_KEY = "last-visited-at";

export default function useLastVisitedAt() {
  const { getItem, setItem } = useLocalStorage(LAST_VISITED_AT_KEY);

  const updateLastVisitedAtToNow = () => setItem(Date.now());
  const lastVisitedAtTime = getItem() as number;

  return {
    lastVisitedAtTime,
    updateLastVisitedAtToNow,
  };
}
