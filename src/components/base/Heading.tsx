import { cn } from "@/utils/helpers";
import { VariantProps, cva } from "class-variance-authority";
import React, { FC } from "react";

const headingVariants = cva("", {
  variants: {
    level: {
      h1: "text-2xl font-extrabold leading-tight tracking-tighter",
      h2: "text-xl font-bold leading-tight tracking-tight",
      h3: "text-lg font-bold",
      h4: "text-md font-semibold",
      h5: "text-sm font-extrabold tracking-widest",

      /**  This heading is unused at the moment, but left open
       *   intentionally for future expansion.                  */
      h6: "",
    },
    textColor: {
      primary: "text-primary",
      secondary: "text-secondary",
      accent: "text-accent",
      body: "text-body",
      gray: "text-gray",
      background: "text-background",
    },
  },
  defaultVariants: {
    level: "h1",
    textColor: "body",
  },
});

export interface HeadingProps
  extends React.HTMLAttributes<HTMLHeadingElement>,
    VariantProps<typeof headingVariants> {
  level: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
}

const Heading: FC<HeadingProps> = ({
  level = "h1",
  textColor,
  className,
  ...props
}) => {
  const HeadingElement = ({
    ...props
  }: React.HTMLAttributes<HTMLHeadingElement>) =>
    React.createElement(level, props, props.children);

  return (
    <HeadingElement
      className={cn(headingVariants({ level, textColor, className }))}
      {...props}
    ></HeadingElement>
  );
};
Heading.displayName = "Heading";

export { Heading, headingVariants };
