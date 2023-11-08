"use client";

import useLastVisitedAt from "@/hooks/useLastVisitedAt";
import { useEffect } from "react";
import { moreThanOneDayAgo } from "../../lib/utils";
import useEarlyAccessInfoModal from "@/hooks/useEarlyAccessInfoModal";

function VisitEventHandler() {
  // Component dependencies
  const { onOpen: openEarlyAccessInfoModal } = useEarlyAccessInfoModal();

  // Operate on events depending on the user's last visited at time before updating
  const { lastVisitedAtTime, updateLastVisitedAtToNow } = useLastVisitedAt();

  if (lastVisitedAtTime === undefined) {
    openEarlyAccessInfoModal();
  }

  if (moreThanOneDayAgo(lastVisitedAtTime)) {
    openEarlyAccessInfoModal();
  }

  // Record now as the last time the user has visited
  useEffect(() => {
    updateLastVisitedAtToNow();
  }, []);

  return null;
}

export default VisitEventHandler;
