import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { InfoCircledIcon } from "@radix-ui/react-icons";
import React from "react";
import { Heading } from "./heading";
import { Text } from "./text";
import { HeadingLevels } from "@/types/text";
import { cn } from "../../../lib/utils";
import { VariantProps, cva } from "class-variance-authority";

const infoTooltipVariants = cva("absolute z-50 p-8 text-base", {
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
    <Text className="text-sm font-medium">{content.description}</Text>
  );

  return (
    <span className={cn(infoTooltipVariants({ color, className }))}>
      <Popover>
        <PopoverTrigger className="p-8">
          <InfoCircledIcon width={20} height={20} />
        </PopoverTrigger>
        <PopoverContent
          className="flex w-[200px] flex-col gap-[6px] px-8 py-4"
          sticky="always"
        >
          {heading}
          {description}
        </PopoverContent>
      </Popover>
    </span>
  );
};

export default InfoTooltip;
