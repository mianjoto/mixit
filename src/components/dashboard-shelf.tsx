import { cva, VariantProps } from "class-variance-authority";
import { HTMLAttributes } from "react";
import { cn } from "../../lib/utils";
import { DashboardCard } from "./dashboard-card";

const dashboardShelfVariants = cva("", {
  variants: {
    desktopBehavior: {
      shelf:
        "lg:inline-flex lg:max-w-fit lg:flex-row lg:gap-8 lg:lg:gap-12 lg:overflow-x-auto lg:pb-8",
      grid: "lg:grid lg:w-full lg:grid-cols-dashboard-shelf lg:gap-12",
    },
    mobileBehavior: {
      default:
        "inline-flex w-full flex-row gap-8 overflow-x-auto pb-8 lg:gap-12",
      "one-col": "grid grid-cols-1 gap-12 lg:gap-16",
      "two-col": "grid grid-cols-2 gap-x-12 gap-y-8",
      "three-col": "grid grid-cols-3 gap-x-12 gap-y-8",
    },
  },
  defaultVariants: { desktopBehavior: "grid", mobileBehavior: "default" },
});

export interface DashboardShelfProps
  extends HTMLAttributes<HTMLElement>,
    VariantProps<typeof dashboardShelfVariants> {}

const generateLoadingCards = (numberOfCards: number = 3) => {
  const cards = [];
  for (let index = 0; index < numberOfCards; index++) {
    cards.push(<DashboardCard.Loading key={`loading-card-${index}`} />);
  }
  return cards;
};

const LOADING_CARDS = generateLoadingCards();

export const DashboardShelf = ({
  desktopBehavior,
  mobileBehavior,
  children,
}: DashboardShelfProps) => {
  return (
    <section
      className={cn(
        dashboardShelfVariants({ desktopBehavior, mobileBehavior })
      )}
    >
      {children || LOADING_CARDS}
    </section>
  );
};
