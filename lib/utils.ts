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
