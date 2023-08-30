import { cn } from "@/utils/helpers";
import { VariantProps, cva } from "class-variance-authority";
import React from "react";

const separatorVariants = cva("", {
  variants: {
    color: {
      gray: "bg-gray",
      white: "bg-body",
      primary: "bg-primary",
      "accent-1": "bg-accent-1",
      "accent-2": "bg-accent-2",
      "accent-3": "bg-accent-3",
      "accent-4": "bg-accent-4",
      "accent-5": "bg-accent-5",
    },
    height: {
      "1px": "h-[1px]",
      "2px": "h-[2px]",
      "3px": "h-[3px]",
    },
  },
  defaultVariants: { color: "gray", height: "1px" },
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
    | "accent-5";
  height?: "1px" | "2px" | "3px";
  className?: string;
}

const Separator = ({ color = "gray", className }: SeparatorProps) => {
  return <span className={cn(separatorVariants({ color }), className)}></span>;
};

export default Separator;
