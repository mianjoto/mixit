import { DiscSVG } from "@/assets/svg";
import { cn } from "../../lib/utils";
import { VariantProps, cva } from "class-variance-authority";
import { FC } from "react";

const discVariants = cva("-z-10", {
  variants: {
    ringColor: {
      primary: "text-primary",
      "accent-1": "text-accent-1",
      "accent-2": "text-accent-2",
      "accent-3": "text-accent-3",
      "accent-4": "text-accent-4",
      "accent-5": "text-accent-5",
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
