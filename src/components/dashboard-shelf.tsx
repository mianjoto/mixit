"use client";

import { cva, VariantProps } from "class-variance-authority";
import React, { HTMLAttributes } from "react";
import { cn } from "../../lib/utils";
import { DashboardCard } from "./dashboard-card";
import * as Separator from "@radix-ui/react-separator";

const dashboardShelfVariants = cva("", {
  variants: {
    desktopBehavior: {
      shelf:
        "md:inline-flex md:max-w-fit md:flex-row md:gap-12 md:overflow-x-auto",
      grid: "md:grid md:w-full md:grid-cols-dashboard-shelf md:gap-12 md:gap-x-12",
    },
    mobileBehavior: {
      default: "inline-flex w-full flex-row gap-8 overflow-x-auto md:gap-12",
      "one-col": "grid grid-cols-1 gap-12 md:gap-16",
      "two-col": "grid grid-cols-2 gap-x-12 gap-y-8",
      "three-col": "grid grid-cols-3 gap-x-12 gap-y-8",
    },
  },
  defaultVariants: {
    desktopBehavior: "grid",
    mobileBehavior: "default",
  },
});

export interface DashboardShelfProps
  extends HTMLAttributes<HTMLElement>,
    VariantProps<typeof dashboardShelfVariants> {
  withSeparators?: boolean;
}

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
  withSeparators = false,
  children,
}: DashboardShelfProps) => {
  let content;

  if (children === undefined) {
    content = LOADING_CARDS;
  }

  if (withSeparators && children !== undefined) {
    content = separateContent(children);
  } else {
    content = children;
  }

  return (
    <section
      className={cn(
        dashboardShelfVariants({
          desktopBehavior,
          mobileBehavior,
        })
      )}
    >
      {content}
    </section>
  );
};

function separateContent(content: React.ReactNode) {
  const contentArray = React.Children.toArray(content);
  if (contentArray.length === 1) {
    return contentArray;
  }

  return contentArray.map((element, index) => {
    const isLastElement = index === contentArray.length - 1;

    if (isLastElement) {
      return element;
    }

    return (
      <>
        {element}
        <Separator.Root
          orientation="vertical"
          className="my-40 w-[3px] bg-[#D9D9D9]/20"
        />
      </>
    );
  });
}
