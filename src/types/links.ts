import { AppData } from "@/data/records/apps";
import { Apps } from "./apps";
import { ContactData } from "@/data/objects/contact";

export interface Link {
  text: string;
  href: string;
}

export type LinkOrHref = Link | string;

export const Links = {
  about: {
    root: {
      text: "About",
      href: "/about",
    },
    whyUseMixit: {
      text: "Why use Mixit?",
      href: "/about/404",
    } as Link,
    mixitShuffle: {
      text: "How does Mixit shuffle?",
      href: "/about/404",
    } as Link,
    spotifyShuffle: {
      text: "Why is Spotify shuffle not random?",
      href: "/about/404",
    } as Link,
    whatIsRandom: {
      text: "What is randomness?",
      href: "/about/404",
    } as Link,
  },
  apps: {
    root: {
      text: "Dashboard",
      href: "/dashboard",
    },
    [Apps.Shuffler]: {
      text: AppData.Shuffler.name,
      href: AppData.Shuffler.href,
    } as Link,
    [Apps.Blender]: {
      text: AppData.Blender.name,
      href: AppData.Blender.href,
    } as Link,
    [Apps.PickAndMix]: {
      text: AppData["Pick And Mix"].name,
      href: AppData["Pick And Mix"].href,
    } as Link,
    [Apps.TimeMachine]: {
      text: AppData["Time Machine"].name,
      href: AppData["Time Machine"].href,
    } as Link,
  },
  contact: {
    root: {
      text: "Contact",
      href: "/contact",
    } as Link,
    linkedIn: {
      text: "LinkedIn",
      href: ContactData.links.linkedIn,
    } as Link,
    github: {
      text: "GitHub",
      href: ContactData.links.github,
    } as Link,
    repo: {
      text: "Repository",
      href: ContactData.links.repo,
    } as Link,
  },
  privacy: {
    root: {
      text: "Privacy Policy",
      href: "/privacy",
    },
  },
  user: {
    root: {
      text: "Profile",
      href: "/user",
    },
    login: {
      text: "Log In",
      href: "/user/login",
    },
    logout: {
      text: "Log Out",
      href: "/user/logout",
    },
  },
};
