import { HoverCard, HoverCardContent, HoverCardTrigger } from "./hover-card";
import { InfoCircledIcon } from "@radix-ui/react-icons";
import React from "react";
import { Heading } from "./heading";
import { Text } from "./text";
import { HeadingLevels } from "@/types/text";
import { cn } from "../../../lib/utils";
import { VariantProps, cva } from "class-variance-authority";

const infoTooltipVariants = cva("absolute p-8 text-base", {
  variants: {
    color: {
      body: "text-body",
      gray: "text-gray",
    },
  },
  defaultVariants: {
    color: "body",
  },
});

export type InfoTooltipContent = {
  heading?: string;
  description: string;
};

export type InfoTooltipProps = {
  content: InfoTooltipContent;
  className?: string;
} & VariantProps<typeof infoTooltipVariants>;

const InfoTooltip = ({ content, color, className }: InfoTooltipProps) => {
  const heading = content.heading ? (
    <Heading
      level={HeadingLevels.h2}
      className="text-base font-bold uppercase leading-none"
    >
      {content.heading}
    </Heading>
  ) : null;

  const description = (
    <Text textColor="gray" className="text-sm font-medium">
      {content.description}
    </Text>
  );

  return (
    <span className={cn(infoTooltipVariants({ color, className }))}>
      <HoverCard openDelay={300} closeDelay={50}>
        <HoverCardTrigger asChild>
          <InfoCircledIcon width={20} height={20} />
        </HoverCardTrigger>
        <HoverCardContent
          className="w-fit px-12 py-16"
          side="right"
          sideOffset={10}
        >
          <div className="flex flex-col gap-[6px]">
            {heading}
            {description}
          </div>
        </HoverCardContent>
      </HoverCard>
    </span>
  );
};

export default InfoTooltip;
