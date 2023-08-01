import { VariantProps, cva } from "class-variance-authority";
import { cn } from "../utils/helpers";
import { forwardRef } from "react";
import { Link } from "react-router-dom";

const buttonVariants = cva(
  "w-fit rounded-[30px] select-none uppercase font-extrabold transition ease-in-out focus:ring  duration-200",
  {
    variants: {
      variant: {
        default:
          "focus:ring-primary-700 bg-primary text-background hover:bg-primary-600  active:bg-primary-800 active:translate-y-1",
        outline:
          "bg-transparent text-primary border-[3px] border-primary hover:border-primary-700 hover:bg-primary/[.1] active:bg-primary/[.05] active:translate-y-1",
      },
      size: {
        default: "text-btn px-20 py-2",
        sm: "text-small px-10 py-3",
        lg: "text-h3 px-24 py-2",
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
          to={href}
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
            ? "opacity-30 cursor-not-allowed active:translate-y-0"
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
