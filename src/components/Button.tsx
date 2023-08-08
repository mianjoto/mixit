import { VariantProps, cva } from "class-variance-authority";
import { cn } from "../utils/helpers";
import { forwardRef } from "react";
import Link from "next/link";

const buttonVariants = cva(
  "h-fit w-fit select-none rounded-[30px] font-extrabold uppercase transition duration-200 ease-in-out focus:ring",
  {
    variants: {
      variant: {
        solid:
          "bg-primary text-background hover:bg-primary-600 focus:ring-primary-700  active:translate-y-1 active:bg-primary-800",
        outline:
          "border-primary bg-transparent text-primary shadow-[inset_0px_0px_0px_3px_theme(colors.primary.DEFAULT)] hover:border-primary-700 hover:bg-primary/[.1]  active:translate-y-1 active:bg-primary/[.05]",
      },
      size: {
        sm: "px-md py-3xs text-sm tracking-tight",
        md: "px-xl py-2xs text-md tracking-tight",
        lg: "px-2xl py-2xs text-lg tracking-tight",
      },
    },
    defaultVariants: {
      variant: "solid",
      size: "md",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  href?: string;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, children, href, variant, size, ...props }, ref) => {
    if (href) {
      return (
        <Link
          href={href}
          className={cn(buttonVariants({ variant, size, className }))}
        >
          {children}
        </Link>
      );
    }
    return (
      <button
        className={cn(
          buttonVariants({ variant, size, className }),
          props.disabled
            ? "cursor-not-allowed opacity-30 active:translate-y-0"
            : ""
        )}
        ref={ref}
        {...props}
      >
        {children}
      </button>
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
