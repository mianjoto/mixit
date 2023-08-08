import { cn } from "@/utils/helpers";
import { VariantProps, cva } from "class-variance-authority";
import React, { FC } from "react";
import { TextProps } from "./Text";

export interface LinkProps extends TextProps {}

const Link: FC<LinkProps> = ({ className, ...props }) => {
  const TextElement = ({ ...props }: React.HTMLAttributes<HTMLElement>) =>
    React.createElement("span", props, props.children);

  return <TextElement className={cn({ className })} {...props}></TextElement>;
};
Link.displayName = "Link";

export { Link };
