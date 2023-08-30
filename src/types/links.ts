import { AppData } from "@/data/records/apps";
import { Apps } from "./apps";
import { ContactData } from "@/data/objects/contact";

interface Link {
  text: string;
  href: string;
}

export const Links = {
  about: {
    whyUseMixit: {
      text: "Why use Mixit?",
      href: "/about/404",
    } as Link,
    mixitShuffle: {
      text: "How does Mixit shuffle?",
      href: "/about/404",
    } as Link,
    spotifyShuffle: {
      text: "Why does Spotify shuffle not shuffle properly?",
      href: "/about/404",
    } as Link,
    whatIsRandom: {
      text: "What is randomness?",
      href: "/about/404",
    } as Link,
  },
  apps: {
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
    contactUs: {
      text: "Contact us",
      href: "/contact",
    } as Link,
    email: {
      text: "Email",
      href: ContactData.links.email,
    } as Link,
    linkedIn: {
      text: "LinkedIn",
      href: ContactData.links.linkedIn,
    } as Link,
    github: {
      text: "GitHub",
      href: ContactData.links.github,
    } as Link,
  },
};
