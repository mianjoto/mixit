import { VariantProps, cva } from "class-variance-authority";
import { cn } from "../utils/helpers";
import { forwardRef } from "react";
import Link from "next/link";

const buttonVariants = cva(
  "w-fit select-none rounded-[30px] font-extrabold uppercase transition duration-200 ease-in-out  focus:ring",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-background hover:bg-primary-600 focus:ring-primary-700  active:translate-y-1 active:bg-primary-800",
        outline:
          "border-[3px] border-primary  bg-transparent text-primary hover:border-primary-700 hover:bg-primary/[.1]  active:translate-y-1 active:bg-primary/[.05]",
      },
      size: {
        default: "px-20 py-2 text-btn",
        sm: "px-10 py-3 text-small",
        lg: "px-24 py-2 text-h3",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
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
