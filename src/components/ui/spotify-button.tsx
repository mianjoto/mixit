import React from "react";
import { VariantProps, cva } from "class-variance-authority";
import { cn } from "@/../lib/utils";
import { HTMLAttributes } from "react";

export const buttonVariants = cva(
  "rounded-3xl  bg-[#1DB954]  px-24 py-12 font-bold uppercase text-body transition duration-300 hover:bg-[#0DA944] focus:bg-[#0DA944] focus:ring focus:ring-[body] active:translate-y-1 active:bg-[#009934] active:ring-[body]",
  {
    variants: {
      variant: {
        default: "",
        outline: "",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

type SpotifyButtonProps = {
  className?: string;
} & VariantProps<typeof buttonVariants> &
  HTMLAttributes<HTMLButtonElement>;

const SpotifyButton = ({
  variant,
  className,
  ...props
}: SpotifyButtonProps) => {
  return (
    <button
      className={cn(buttonVariants({ variant, className }))}
      type="button"
      {...props}
    ></button>
  );
};

export default SpotifyButton;
