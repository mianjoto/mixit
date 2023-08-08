import { cn } from "@/utils/helpers";
import { VariantProps, cva } from "class-variance-authority";
import React, { FC } from "react";
import { HeadingProps } from "./Heading";
import { headingVariants } from "./Heading";

interface PretitleProps extends HeadingProps {}

const Pretitle: FC<PretitleProps> = ({ className, ...props }) => {
  const HeadingElement = ({
    ...props
  }: React.HTMLAttributes<HTMLHeadingElement>) =>
    React.createElement("h5", props, props.children);

  return (
    <HeadingElement
      className={cn(
        headingVariants({ level: "h5", textColor: "accent", className })
      )}
      {...props}
    ></HeadingElement>
  );
};
Pretitle.displayName = "Pretitle";

export { Pretitle };
