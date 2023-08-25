import { cn } from "@/utils/helpers";
import { VariantProps, cva } from "class-variance-authority";
import React, { FC } from "react";
import { HeadingProps } from "./Heading";
import { headingVariants } from "./Heading";
import { HeadingLevels } from "@/types/text";

interface PretitleProps extends React.HTMLAttributes<HTMLHeadingElement> {}

const Pretitle: FC<PretitleProps> = ({ className, ...props }) => {
  const HeadingElement = ({
    ...props
  }: React.HTMLAttributes<HTMLHeadingElement>) =>
    React.createElement("h5", props, props.children);

  return (
    <HeadingElement
      className={cn(
        headingVariants({
          level: HeadingLevels.h5,
          textColor: "primary",
          className,
        }),
        "uppercase"
      )}
      {...props}
    ></HeadingElement>
  );
};
Pretitle.displayName = "Pretitle";

export { Pretitle };
