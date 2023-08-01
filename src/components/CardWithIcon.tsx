import { VariantProps } from "class-variance-authority";
import { cn } from "../utils/helpers";
import { FC } from "react";
import { Card, CardProps, cardVariants } from "./Card";

export interface CardWithIconProps
  extends CardProps,
    VariantProps<typeof cardVariants> {
  svgPath?: string | null;
}

const CardWithIcon: FC<CardWithIconProps> = ({
  svgPath,
  variant,
  sizing,
  direction,
  className,
  ...props
}) => {
  if (svgPath) {
    return (
      <Card
        className={cn(
          cardVariants({ variant, sizing, direction, className, ...props })
        )}
      >
        {props.children}
      </Card>
    );
  }
  return (
    <div
      className={cn(
        cardVariants({ variant, sizing, direction, className, ...props })
      )}
      {...props}
    ></div>
  );
};

export { CardWithIcon };
