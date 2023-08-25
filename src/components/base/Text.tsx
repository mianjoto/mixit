import { TextLevels } from "@/types/text";
import { cn } from "@/utils/helpers";
import { VariantProps, cva } from "class-variance-authority";
import React, { FC } from "react";

const textVariants = cva("font-normal leading-[24px]", {
  variants: {
    level: {
      p: "text-base",
      small: "text-sm",
      strong: "font-bold",
      u: "inline-block font-bold text-accent underline underline-offset-4 hover:cursor-pointer",

      /**  This is left intentionally blank to provide client abstraction
       *   for the HTML span element while giving access to brand
       *   colors and apply any custom classes                             */
      span: "",

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
  },
  defaultVariants: {
    level: "p",
    textColor: "body",
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
  className,
  ...props
}) => {
  const TextElement = ({ ...props }: React.HTMLAttributes<HTMLElement>) =>
    React.createElement(level, props, props.children);

  return (
    <TextElement
      className={cn(textVariants({ level, alignment, textColor, className }))}
      {...props}
    ></TextElement>
  );
};
Text.displayName = "Text";

export { Text, textVariants };
