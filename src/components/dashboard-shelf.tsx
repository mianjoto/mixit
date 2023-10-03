import { cva, VariantProps } from "class-variance-authority";
import { HTMLAttributes } from "react";
import { cn } from "../../lib/utils";

const dashboardShelfVariants = cva(
  "lg:inline-flex lg:w-full lg:flex-row lg:gap-12 lg:gap-8 lg:overflow-x-auto lg:pb-8",
  {
    variants: {
      mobileBehavior: {
        default:
          "inline-flex w-full flex-row gap-8 overflow-x-auto pb-8 lg:gap-12",
        "one-col": "grid grid-cols-1 gap-12 lg:gap-16",
        "two-col": "grid grid-cols-2 gap-x-12 gap-y-8",
        "three-col": "grid grid-cols-3 gap-x-12 gap-y-8",
      },
    },
    defaultVariants: { mobileBehavior: "default" },
  }
);
interface DashboardShelfProps
  extends HTMLAttributes<HTMLElement>,
    VariantProps<typeof dashboardShelfVariants> {}
export const DashboardShelf = ({
  mobileBehavior,
  children,
}: DashboardShelfProps) => {
  return (
    <section className={cn(dashboardShelfVariants({ mobileBehavior }))}>
      {children}
    </section>
  );
};
