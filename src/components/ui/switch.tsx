"use client";

import * as React from "react";
import * as SwitchPrimitives from "@radix-ui/react-switch";
import { cn } from "../../../lib/utils";
import { VariantProps, cva } from "class-variance-authority";

const switchVariants = cva(
  "focus-visible:ring-ring peer inline-flex h-[24px] w-[44px] shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-[state=unchecked]:bg-gray",
  {
    variants: {
      checkedBgColor: {
        primary: "data-[state=checked]:bg-primary",
        "accent-1": "data-[state=checked]:bg-accent-1",
        "accent-2": "data-[state=checked]:bg-accent-2",
        "accent-3": "data-[state=checked]:bg-accent-3",
        "accent-4": "data-[state=checked]:bg-accent-4",
      },
    },
    defaultVariants: {
      checkedBgColor: "primary",
    },
  }
);

type SwitchProps = {
  onCheckedChange: (checked: boolean) => void;
} & VariantProps<typeof switchVariants>;

const Switch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitives.Root>,
  React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root> & SwitchProps
>(
  (
    { checkedBgColor, onCheckedChange, defaultChecked, className, ...props },
    ref
  ) => (
    <SwitchPrimitives.Root
      className={cn(switchVariants({ checkedBgColor, className }))}
      {...props}
      onCheckedChange={onCheckedChange}
      ref={ref}
    >
      <SwitchPrimitives.Thumb
        className={cn(
          "pointer-events-none block h-5 w-5 rounded-full bg-body shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-0"
        )}
      />
    </SwitchPrimitives.Root>
  )
);
Switch.displayName = SwitchPrimitives.Root.displayName;

export { Switch };
