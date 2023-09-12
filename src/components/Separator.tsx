import { cn } from "@/utils/helpers";
import { VariantProps, cva } from "class-variance-authority";
import React from "react";

const separatorVariants = cva("", {
  variants: {
    orientation: {
      horizontal: "h-[1px] w-full",
      vertical: "h-full w-[1px]",
    },
    color: {
      gray: "bg-gray",
      white: "bg-body",
      primary: "bg-primary",
      "accent-1": "bg-accent-1",
      "accent-2": "bg-accent-2",
      "accent-3": "bg-accent-3",
      "accent-4": "bg-accent-4",
      "accent-5": "bg-accent-5",
      gradient: "bg-accent-gradient",
    },
    height: {
      "1px": "h-[1px]",
      "2px": "h-[2px]",
      "3px": "h-[3px]",
      "15px": "h-[15px]",
    },
  },
  defaultVariants: { orientation: "horizontal", color: "gray", height: "1px" },
});

interface SeparatorProps extends VariantProps<typeof separatorVariants> {
  color?:
    | "gray"
    | "white"
    | "primary"
    | "accent-1"
    | "accent-2"
    | "accent-3"
    | "accent-4"
    | "accent-5"
    | "gradient";
  height?: "1px" | "2px" | "3px" | "15px";
  className?: string;
}

const Separator = ({
  orientation,
  color = "gray",
  height,
  className,
}: SeparatorProps) => {
  return (
    <span
      className={cn(
        separatorVariants({ orientation, color, height }),
        className
      )}
    ></span>
  );
};

export default Separator;
