import { VariantProps, cva } from "class-variance-authority";
import { cn } from "../utils/helpers";
import { FC } from "react";

const cardVariants = cva("flex rounded-[18px] bg-secondary", {
  variants: {
    variant: {
      default: "p-sm",
      square: "aspect-square px-sm py-xs",
    },
    sizing: {
      hug: "h-auto w-fit",
      fill: "h-full w-full",
    },
    direction: {
      col: "flex-col",
      row: "flex-row",
    },
  },
  defaultVariants: {
    variant: "default",
    direction: "col",
    sizing: "hug",
  },
});

export interface CardProps
  extends React.BlockquoteHTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {}

const Card: FC<CardProps> = ({
  variant,
  sizing,
  direction,
  className,
  ...props
}) => {
  return (
    <div
      className={cn(cardVariants({ variant, sizing, direction, className }))}
      {...props}
    ></div>
  );
};
Card.displayName = "Card";

export { Card, cardVariants };
