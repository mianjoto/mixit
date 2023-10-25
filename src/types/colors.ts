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
    ringClass: string;
    twClass: string;
    decorationClass: string;
  }
>;

// Potential overengineering, no current use for this
export const ColorData: ColorRecord = {
  [Colors.Primary]: {
    bgClass: "bg-primary",
    textClass: "text-primary",
    ringClass: "ring-primary",
    twClass: "primary",
    decorationClass: "decoratio-primary",
  },
  [Colors.Secondary]: {
    bgClass: "bg-secondary",
    textClass: "text-secondary",
    ringClass: "ring-secondary",
    twClass: "secondary",
    decorationClass: "decoration-secondary",
  },
  [Colors.Tertiary]: {
    bgClass: "bg-tertiary",
    textClass: "text-tertiary",
    ringClass: "ring-tertiary",
    twClass: "tertiary",
    decorationClass: "decoration-tertiary",
  },
  [Colors.Accent]: {
    bgClass: "bg-accent",
    textClass: "text-accent",
    ringClass: "ring-accent",
    twClass: "accent",
    decorationClass: "decoration-accent",
  },
  [Colors.Body]: {
    bgClass: "bg-body",
    textClass: "text-body",
    ringClass: "ring-body",
    twClass: "body",
    decorationClass: "decoration-body",
  },
  [Colors.Gray]: {
    bgClass: "bg-gray",
    textClass: "text-gray",
    ringClass: "ring-gray",
    twClass: "gray",
    decorationClass: "decoration-gray",
  },
  [Colors.Background]: {
    bgClass: "bg-background",
    textClass: "text-background",
    ringClass: "ring-background",
    twClass: "background",
    decorationClass: "decoration-background",
  },
  [Colors["Accent-1"]]: {
    bgClass: "bg-accent-1",
    textClass: "text-accent-1",
    ringClass: "ring-accent-1",
    twClass: "accent-1",
    decorationClass: "decoration-accent-1",
  },
  [Colors["Accent-2"]]: {
    bgClass: "bg-accent-2",
    textClass: "text-accent-2",
    ringClass: "ring-accent-2",
    twClass: "accent-2",
    decorationClass: "decoration-accent-2",
  },
  [Colors["Accent-3"]]: {
    bgClass: "bg-accent-3",
    textClass: "text-accent-3",
    ringClass: "ring-accent-3",
    twClass: "accent-3",
    decorationClass: "decoration-accent-3",
  },
  [Colors["Accent-4"]]: {
    bgClass: "bg-accent-4",
    textClass: "text-accent-4",
    ringClass: "ring-accent-4",
    twClass: "accent-4",
    decorationClass: "decoration-accent-4",
  },
  [Colors["Accent-5"]]: {
    bgClass: "bg-accent-5",
    textClass: "text-accent-5",
    ringClass: "ring-accent-5",
    twClass: "accent-5",
    decorationClass: "decoration-accent-5",
  },
};
