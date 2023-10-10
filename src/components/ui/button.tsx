import { VariantProps, cva } from "class-variance-authority";
import { cn } from "../../../lib/utils";
import { forwardRef } from "react";
import { Link as LinkType } from "@/types/links";
import LinkWrapper from "./link-wrapper";

const buttonVariants = cva(
  "block h-fit w-full select-none rounded-[30px] text-center font-bold uppercase leading-normal transition duration-300 ease-in-out hover:ring focus:ring active:ring lg:w-fit lg:leading-none",
  {
    variants: {
      variant: {
        solid:
          "bg-primary text-background hover:ring-primary-700 focus:ring-primary-900 active:translate-y-1 active:bg-primary-600 active:ring-primary-900",
        outline:
          "border-primary bg-transparent text-primary shadow-[inset_0px_0px_0px_3px_theme(colors.primary.DEFAULT)] hover:border-primary-700 hover:bg-primary/[.1] hover:text-primary/[.6] active:translate-y-1 active:bg-primary/[.05]",
      },
      size: {
        default: "px-24 py-8 text-base tracking-tight",
        cta: "w-full px-32 py-12 text-lg tracking-tight lg:w-fit lg:px-56 lg:text-[32px]",
      },
    },
    defaultVariants: {
      variant: "solid",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  href?: LinkType | string;
  willRedirect?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { href, willRedirect = true, variant, size, className, children, ...props },
    ref
  ) => {
    if (href) {
      return (
        <LinkWrapper
          href={href!}
          className={cn(buttonVariants({ variant, size, className }))}
          isInteractive={false}
        >
          {children}
        </LinkWrapper>
      );
    } else {
      return (
        <button
          className={cn(
            buttonVariants({ variant, size, className }),
            props.disabled
              ? "cursor-not-allowed opacity-30 active:translate-y-0"
              : ""
          )}
          type="button"
          ref={ref}
          {...props}
        >
          {children}
        </button>
      );
    }
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
