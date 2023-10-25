import {
  ShufflerIcon,
  BlenderIcon,
  PickAndMixIcon,
  TimeMachineIcon,
  QueueIcon,
} from "@/assets/svg";
import { ColorData } from "../../types/colors";
import { Apps, Features } from "../../types/apps";

type AppOrFeature = Apps | Features;
type AppFeatureDataRecord = Record<
  AppOrFeature,
  {
    name: string;
    description: string;
    shortDescription: string;
    icon: any;
    textColor: string;
    bgColor: string;
    ringColor: string;
    decorationColor: string;
    href: string;
    appType: Apps | Features;
  }
>;

export const AppData: AppFeatureDataRecord = {
  [Apps.Shuffler]: {
    name: "Shuffler",
    description: "Shuffle your playlists to ensure a random mix every time.",
    shortDescription: "Truly shuffle your music",
    icon: ShufflerIcon,
    textColor: ColorData["Accent-1"].textClass,
    bgColor: ColorData["Accent-1"].bgClass,
    ringColor: ColorData["Accent-1"].ringClass,
    decorationColor: ColorData["Accent-1"].decorationClass,
    href: "/shuffler",
    appType: Apps.Shuffler,
  },
  [Apps.Blender]: {
    name: "Blender",
    description: "Randomly shuffle from all of your playlists",
    shortDescription: "Blend from all playlists",
    icon: BlenderIcon,
    textColor: ColorData["Accent-2"].textClass,
    bgColor: ColorData["Accent-2"].bgClass,
    ringColor: ColorData["Accent-2"].ringClass,
    decorationColor: ColorData["Accent-2"].decorationClass,
    href: "/blender",
    appType: Apps.Blender,
  },
  [Apps.PickAndMix]: {
    name: "Pick And Mix",
    description: "Choose genres to blend into a new playlist",
    shortDescription: "Choose genres to blend",
    icon: PickAndMixIcon,
    textColor: ColorData["Accent-3"].textClass,
    bgColor: ColorData["Accent-3"].bgClass,
    ringColor: ColorData["Accent-3"].ringClass,
    decorationColor: ColorData["Accent-3"].decorationClass,
    href: "/pick-and-mix",
    appType: Apps.PickAndMix,
  },
  [Apps.TimeMachine]: {
    name: "Time Machine",
    description: "Go back in time to rediscover your old favs",
    shortDescription: "Go back in time",
    icon: TimeMachineIcon,
    textColor: ColorData["Accent-4"].textClass,
    bgColor: ColorData["Accent-4"].bgClass,
    ringColor: ColorData["Accent-4"].ringClass,
    decorationColor: ColorData["Accent-4"].decorationClass,
    href: "/time-machine",
    appType: Apps.TimeMachine,
  },
} as AppFeatureDataRecord;

export const FeatureData: AppFeatureDataRecord = {
  [Features.Queue]: {
    name: "Queue",
    description: "Look at what tracks are coming up next.",
    shortDescription: "See upcoming tracks",
    icon: QueueIcon,
    bgColor: ColorData["Primary"].bgClass,
    href: "/queue",
    appType: Features.Queue,
  },
} as AppFeatureDataRecord;
