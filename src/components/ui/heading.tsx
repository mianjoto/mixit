import { HeadingLevels } from "@/types/text";
import { cn } from "@/utils/helpers";
import { VariantProps, cva } from "class-variance-authority";
import React, { FC } from "react";

const headingVariants = cva("font-bold", {
  variants: {
    level: {
      [HeadingLevels.h1]: "text-2xl leading-none tracking-tighter ",
      [HeadingLevels.h2]: "text-xl leading-tight tracking-tight",
      [HeadingLevels.h3]: "text-lg leading-none tracking-tight sm:leading-snug",
      [HeadingLevels.h4]: "text-base leading-normal",
      [HeadingLevels.h5]:
        "text-base font-medium leading-normal tracking-widest",

      /**  This heading is unused at the moment, but left open
       *   intentionally for future expansion.                  */
      [HeadingLevels.h6]: "",
    },
    textColor: {
      primary: "text-primary",
      secondary: "text-secondary",
      accent: "text-accent",
      body: "text-body",
      gray: "text-gray",
      background: "text-background",
    },
    alignment: {
      left: "text-left",
      center: "text-center",
      right: "text-right",
      justify: "text-justify",
      start: "text-start",
      end: "text-end",
    },
  },
  defaultVariants: {
    level: HeadingLevels.h1,
    textColor: "body",
    alignment: "left",
  },
});

export interface HeadingProps
  extends React.HTMLAttributes<HTMLHeadingElement>,
    VariantProps<typeof headingVariants> {
  level?: HeadingLevels;
}

const Heading: FC<HeadingProps> = ({
  level = HeadingLevels.h1,
  alignment = "left",
  textColor,
  className,
  ...props
}) => {
  const HeadingElement = ({
    ...props
  }: React.HTMLAttributes<HTMLHeadingElement>) =>
    React.createElement(level.toString(), props, props.children);

  return (
    <HeadingElement
      className={cn(
        headingVariants({ level, alignment, textColor, className })
      )}
      {...props}
    ></HeadingElement>
  );
};
Heading.displayName = "Heading";

export { Heading, headingVariants };
