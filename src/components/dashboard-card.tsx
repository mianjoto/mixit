import { Link as LinkType } from "@/types/links";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import Link from "next/link";
import React from "react";
import LinkWrapper, { linkWrapperVariants } from "./ui/link-wrapper";
import { cn } from "../../lib/utils";
import WithSkeleton from "./ui/with-skeleton";

interface DashboardCardProps {
  title: string | undefined | null;
  description: string | undefined | null;
  className?: string;
  bgColor?: "secondary" | "tertiary";
  descriptionClamp?: "one-line" | "two-line" | "none";
  noClickBehavior?: boolean;
  href?: LinkType | string;
  onClick?: () => void;
  small?: boolean;
  image?: React.JSX.Element | string | undefined | null;
}

const defaultCardLayout = ({
  image,
  title,
  bgColor,
  description,
  descriptionClamp,
  className,
}: DashboardCardProps) => {
  let descriptionClampClass = "";
  if (descriptionClamp === "one-line") {
    descriptionClampClass = "line-clamp-1";
  } else if (descriptionClamp === "two-line") {
    descriptionClampClass = "line-clamp-2";
  }

  const bgColorClass = bgColor === "secondary" ? "bg-secondary" : "bg-tertiary";

  return (
    <section
      className={cn(
        bgColorClass,
        "flex w-[160px] flex-col gap-12 rounded-[18px] p-12 pb-16 text-left md:w-full md:max-w-[240px] md:gap-16 md:p-16 md:pb-24",
        className
      )}
    >
      <div className="aspect-square h-auto w-full">
        <WithSkeleton
          content={image}
          skeletonProps={{ className: "w-full h-full" }}
        />{" "}
      </div>
      <div className="flex flex-col gap-4">
        <p className="truncate text-base font-bold uppercase text-body">
          <WithSkeleton content={title} />
        </p>
        <p
          className={cn(descriptionClampClass, "text-sm font-medium text-gray")}
        >
          <WithSkeleton content={description} />
        </p>
      </div>
    </section>
  );
};

const smallCardLayout = ({
  image,
  title,
  bgColor,
  description,
  descriptionClamp,
  className,
}: DashboardCardProps) => {
  let descriptionClampClass = "";
  if (descriptionClamp === "one-line") {
    descriptionClampClass = "md:line-clamp-1";
  } else if (descriptionClamp === "two-line") {
    descriptionClampClass = "md:line-clamp-2";
  }

  const bgColorClass = bgColor === "secondary" ? "bg-secondary" : "bg-tertiary";

  return (
    <section
      className={cn(
        bgColorClass,
        "flex w-full flex-row items-center gap-12 overflow-hidden rounded-md text-left md:flex md:w-full md:max-w-[240px] md:flex-col md:gap-16 md:rounded-[18px] md:bg-tertiary md:p-16 md:pb-24",
        className
      )}
    >
      <div className="aspect-square h-[60px] w-[60px] md:h-auto md:w-full">
        <WithSkeleton
          content={image}
          skeletonProps={{ className: "w-full h-full" }}
        />
      </div>
      <div className="flex flex-col gap-4">
        <p className="text-base font-bold uppercase text-body md:truncate">
          <WithSkeleton content={title} />
        </p>
        <p
          className={cn(
            descriptionClampClass,
            "hidden text-sm font-medium text-gray md:block"
          )}
        >
          <WithSkeleton content={description} />
        </p>
      </div>
    </section>
  );
};

const DashboardCardComponent = ({
  title,
  description,
  bgColor = "tertiary",
  noClickBehavior = false,
  descriptionClamp = "two-line",
  href = "/404",
  onClick,
  small = false,
  image,
  className,
}: DashboardCardProps) => {
  if (typeof image === "string") {
    image = <img src={image} className="aspect-square h-full w-full" />;
  }

  const card = small
    ? smallCardLayout({
        image,
        title,
        bgColor,
        description,
        descriptionClamp,
        className,
      })
    : defaultCardLayout({
        image,
        title,
        bgColor,
        description,
        descriptionClamp,
        className,
      });

  if (noClickBehavior) {
    return card;
  }

  if (onClick) {
    return (
      <button
        type="button"
        className={cn(
          linkWrapperVariants({ isInteractive: true }),
          "h-fit w-full"
        )}
        onClick={onClick}
      >
        {card}
      </button>
    );
  }

  return (
    <LinkWrapper href={href} className="w-full">
      {card}
    </LinkWrapper>
  );
};
DashboardCardComponent.displayName = "Card";

type DashboardCardLoadingProps = { small?: boolean };

const DashboardCardLoading = ({ small = false }: DashboardCardLoadingProps) => {
  const undefinedCardProps = {
    title: undefined,
    description: undefined,
    image: undefined,
  };

  const card = small
    ? smallCardLayout({ ...undefinedCardProps })
    : defaultCardLayout({ ...undefinedCardProps });

  return card;
};

export const DashboardCard =
  DashboardCardComponent as typeof DashboardCardComponent & {
    Loading: typeof DashboardCardLoading;
  };
DashboardCardComponent.Loading = DashboardCardLoading;
