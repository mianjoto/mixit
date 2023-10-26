import { DiscSVG } from "@/assets/svg";
import { cn } from "../../lib/utils";
import { VariantProps, cva } from "class-variance-authority";
import { FC } from "react";

export type RingColors =
  | "primary"
  | "accent-1"
  | "accent-2"
  | "accent-3"
  | "accent-4"
  | "accent-5";

const discVariants = cva("-z-10", {
  variants: {
    ringColor: {
      ["primary" as RingColors]: "text-primary",
      ["accent-1" as RingColors]: "text-accent-1",
      ["accent-2" as RingColors]: "text-accent-2",
      ["accent-3" as RingColors]: "text-accent-3",
      ["accent-4" as RingColors]: "text-accent-4",
      ["accent-5" as RingColors]: "text-accent-5",
    },
    spin: {
      clockwise: "motion-safe:animate-disc-spin-cw",
      counterClockwise: "motion-safe:animate-disc-spin-ccw",
      none: "motion-safe:animate-none",
    },
  },
  defaultVariants: {
    ringColor: "primary",
    spin: "clockwise",
  },
});

export interface DiscProps
  extends React.HTMLAttributes<HTMLOrSVGImageElement>,
    VariantProps<typeof discVariants> {}

const Disc: FC<DiscProps> = ({
  ringColor,
  spin,
  className,
  ...props
}: DiscProps) => {
  return (
    <>
      <DiscSVG
        className={cn(discVariants({ ringColor, spin, className }))}
        {...props}
      ></DiscSVG>
    </>
  );
};
Disc.displayName = "Disc";

export { Disc };
