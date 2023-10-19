import { AppData } from "@/data/records/apps";
import { Apps } from "@/types/apps";
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

export function getPlaylistCoverImage(
  playlist: SpotifyApi.PlaylistObjectSimplified
) {
  // If the playlist has no images, return null
  if (playlist.images.length === 0) {
    return null;
  }

  // If the playlist has only one image, return it
  if (playlist.images.length === 1) {
    return playlist.images[0]!;
  }

  // If the playlist has multiple images, return the 300x300 image if it exists
  const image300x300 = playlist.images.find((image) => {
    return image.width === 300 && image.height === 300;
  });

  if (image300x300) {
    return image300x300;
  }

  // If no 300x300 image, return the smallest
  return getSmallestImageFromArray(playlist.images);
}

export function getSmallestImageFromArray(images: SpotifyApi.ImageObject[]) {
  if (images.length === 1) {
    return images[0]!;
  }

  return images.reduce((smallestImage, currentImage) => {
    if (currentImage.width == null || smallestImage.width == null) {
      return currentImage;
    }

    if (currentImage.width! < smallestImage.width!) {
      return currentImage;
    } else {
      return smallestImage;
    }
  });
}

export function getTextColorFromApp(app: Apps) {
  return AppData[app].textColor;
}

export function getBgColorFromApp(app: Apps) {
  return AppData[app].bgColor;
}

export function getRingColorFromApp(app: Apps) {
  return AppData[app].ringColor;
}
