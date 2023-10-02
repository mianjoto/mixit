import { Link, LinkOrHref } from "@/types/links";
import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(...inputs));
}

export function getHref(linkOrHref: LinkOrHref): string {
  const isLinkType = (linkOrHref as Link)?.href !== undefined;

  if (isLinkType) {
    return (linkOrHref as Link).href;
  } else {
    return linkOrHref as string;
  }
}

export function cleanPlaylistAttributes(
  playlist: SpotifyApi.PlaylistObjectSimplified
) {
  removeAnchorTagFromDescription();
  handleEmptyPlaylistAttributes();

  function removeAnchorTagFromDescription() {
    if (!playlist.description) {
      return;
    }

    // Skip if the playlist is not owned by Spotify (since only Spotify playlists have anchor tags)
    if (playlist.owner.uri !== "spotify:user:spotify") {
      return;
    }

    const removeAnchorTagRegex = /<a\b[^>]*>(.*?)<\/a>/gi;
    playlist.description = playlist.description.replace(
      removeAnchorTagRegex,
      "$1"
    );
  }

  function handleEmptyPlaylistAttributes() {
    if (playlist.description == null || playlist.description === "") {
      playlist.description = `By ${playlist.owner.display_name}`;
    }

    if (playlist.name == null || playlist.name === "") {
      playlist.name = "-";
    }
  }
}
