import { cn } from "@/utils/helpers";
import { VariantProps, cva } from "class-variance-authority";
import React, { FC } from "react";

const textVariants = cva("", {
  variants: {
    textType: {
      p: "text-body leading-8",
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
      accent: "text-accent",
      body: "text-body",
      gray: "text-gray",
      background: "text-background",
    },
  },
  defaultVariants: {
    textType: "p",
    textColor: "body",
  },
});

export interface TextProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof textVariants> {
  textType:
    | "p"
    | "span"
    | "small"
    | "strong"
    | "u"
    | "mark"
    | "summary"
    | "blockquote";
}

const Text: FC<TextProps> = ({
  textType = "p",
  textColor,
  className,
  ...props
}) => {
  const TextElement = ({ ...props }: React.HTMLAttributes<HTMLElement>) =>
    React.createElement(textType, props, props.children);

  return (
    <TextElement
      className={cn(textVariants({ textType, textColor, className }))}
      {...props}
    ></TextElement>
  );
};
Text.displayName = "Text";

export { Text, textVariants };
