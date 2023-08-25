const enum Colors {
  Primary = "Primary",
  Secondary = "Secondary",
  Tertiary = "Tertiary",
  Accent = "Accent",
  Body = "Body",
  Gray = "Gray",
  Background = "Background",
  "Accent-1" = "Accent-1",
  "Accent-2" = "Accent-2",
  "Accent-3" = "Accent-3",
  "Accent-4" = "Accent-4",
  "Accent-5" = "Accent-5",
}

export type ColorRecord = Record<
  Colors,
  {
    bgClass: string;
    textClass: string;
  }
>;

// Potential overengineering, no current use for this
export const ColorData: ColorRecord = {
  [Colors.Primary]: {
    bgClass: "bg-primary",
    textClass: "text-primary",
  },
  [Colors.Secondary]: {
    bgClass: "bg-secondary",
    textClass: "text-secondary",
  },
  [Colors.Tertiary]: {
    bgClass: "bg-tertiary",
    textClass: "text-tertiary",
  },
  [Colors.Accent]: {
    bgClass: "bg-accent",
    textClass: "text-accent",
  },
  [Colors.Body]: {
    bgClass: "bg-body",
    textClass: "text-body",
  },
  [Colors.Gray]: {
    bgClass: "bg-gray",
    textClass: "text-gray",
  },
  [Colors.Background]: {
    bgClass: "bg-background",
    textClass: "text-background",
  },
  [Colors["Accent-1"]]: {
    bgClass: "bg-accent-1",
    textClass: "text-accent-1",
  },
  [Colors["Accent-2"]]: {
    bgClass: "bg-accent-2",
    textClass: "text-accent-2",
  },
  [Colors["Accent-3"]]: {
    bgClass: "bg-accent-3",
    textClass: "text-accent-3",
  },
  [Colors["Accent-4"]]: {
    bgClass: "bg-accent-4",
    textClass: "text-accent-4",
  },
  [Colors["Accent-5"]]: {
    bgClass: "bg-accent-5",
    textClass: "text-accent-5",
  },
};
