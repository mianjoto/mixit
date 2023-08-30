import {
  ShufflerIcon,
  BlenderIcon,
  PickAndMixIcon,
  TimeMachineIcon,
  QueueIcon,
} from "@/assets/svg";
import { ColorData } from "./colors";

export enum Apps {
  Shuffler = "Shuffler",
  Blender = "Blender",
  PickAndMix = "Pick And Mix",
  TimeMachine = "Time Machine",
}

export enum Features {
  Queue = "Queue",
}

type AppOrFeature = Apps | Features;

type AppFeatureDataRecord = Record<
  AppOrFeature,
  {
    name: string;
    description: string;
    shortDescription: string;
    icon: any;
    iconBgColorClass: string;
    href: string;
  }
>;

export const AppData: AppFeatureDataRecord = {
  [Apps.Shuffler]: {
    name: "Shuffler",
    description: "Never repeat songs with a truly shuffled queue",
    shortDescription: "Truly shuffle your music",
    icon: ShufflerIcon,
    iconBgColorClass: ColorData["Accent-1"].bgClass,
    href: "/shuffler",
  },
  [Apps.Blender]: {
    name: "Blender",
    description: "Randomly shuffle from all of your playlists",
    shortDescription: "Blend from all playlists",
    icon: BlenderIcon,
    iconBgColorClass: ColorData["Accent-2"].bgClass,
    href: "/blender",
  },
  [Apps.PickAndMix]: {
    name: "Pick And Mix",
    description: "Choose genres to blend into a new playlist",
    shortDescription: "Choose genres to blend",
    icon: PickAndMixIcon,
    iconBgColorClass: ColorData["Accent-3"].bgClass,
    href: "/pick-and-mix",
  },
  [Apps.TimeMachine]: {
    name: "Time Machine",
    description: "Go back in time to rediscover your old favs",
    shortDescription: "Go back in time",
    icon: TimeMachineIcon,
    iconBgColorClass: ColorData["Accent-4"].bgClass,
    href: "/time-machine",
  },
} as AppFeatureDataRecord;

export const FeatureData: AppFeatureDataRecord = {
  [Features.Queue]: {
    name: "Queue",
    description: "Look at what tracks are coming up next.",
    shortDescription: "See upcoming tracks",
    icon: QueueIcon,
    iconBgColorClass: ColorData["Primary"].bgClass,
    href: "/queue",
  },
} as AppFeatureDataRecord;
