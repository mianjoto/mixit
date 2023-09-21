import { cn } from "../../../lib/utils";
import { VariantProps, cva } from "class-variance-authority";

const cardVariants = cva("rounded-[16px]", {
  variants: {
    bgColor: {
      primary: "bg-primary",
      secondary: "bg-secondary",
      tertiary: "bg-tertiary",
      accent: "bg-accent",
      body: "bg-body",
      gray: "bg-gray",
      background: "bg-background",
    },
    flexDirection: {
      row: "inline-flex flex-row",
      col: "inline-flex flex-col",
      none: "",
    },
  },
  defaultVariants: {
    bgColor: "secondary",
    flexDirection: "row",
  },
});

export interface CardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {
  bgColor:
    | "primary"
    | "secondary"
    | "tertiary"
    | "accent"
    | "body"
    | "gray"
    | "background";
  flexDirection: "row" | "col" | "none";
}

const Card: React.FC<CardProps> = ({
  bgColor = "secondary",
  flexDirection = "row",
  children,
  className,
  ...props
}: CardProps) => {
  return (
    <div
      className={cn(cardVariants({ bgColor, flexDirection, className }))}
      {...props}
    >
      {children}
    </div>
  );
};
Card.displayName = "Card";

export { Card, cardVariants };
