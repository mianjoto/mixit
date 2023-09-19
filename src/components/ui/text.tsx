import { TextLevels } from "@/types/text";
import { cn } from "../../../lib/utils";
import { VariantProps, cva } from "class-variance-authority";
import React, { FC } from "react";

const textVariants = cva("text-base leading-[24px]", {
  variants: {
    level: {
      p: "max-w-prose text-base",
      small: "text-sm",
      strong: "font-bold",
      figcaption: "max-w-prose",
      span: "inline",

      /**  These text elements are unused at the moment, but this is left
       *   open for future expansion.                                      */
      mark: "",
      summary: "",
      blockquote: "",
    },
    textColor: {
      primary: "text-primary",
      secondary: "text-secondary",
      tertiary: "text-tertiary",
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
    underline: {
      true: "inline-block underline underline-offset-4 hover:cursor-pointer lg:underline-offset-[6px]",
      false: "",
    },
    underlineColor: {
      primary: "decoration-primary",
      secondary: "decoration-secondary",
      tertiary: "decoration-tertiary",
      accent: "decoration-accent",
      body: "decoration-body",
      gray: "decoration-gray",
      background: "decoration-background",
    },
  },
  defaultVariants: {
    level: "p",
    textColor: "body",
    alignment: "left",
    underline: false,
    underlineColor: "primary",
  },
});

export interface TextProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof textVariants> {
  level?: TextLevels;
}

const Text: FC<TextProps> = ({
  level = TextLevels.p,
  alignment = "left",
  textColor,
  underline = false,
  underlineColor,
  className,
  ...props
}) => {
  const TextElement = ({ ...props }: React.HTMLAttributes<HTMLElement>) =>
    React.createElement(level, props, props.children);

  return (
    <TextElement
      className={cn(
        textVariants({
          level,
          alignment,
          textColor,
          underline,
          underlineColor,
          className,
        })
      )}
      {...props}
    ></TextElement>
  );
};
Text.displayName = "Text";

export { Text, textVariants };
