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
  showFullDescription?: boolean;
  noClickBehavior?: boolean;
  href?: LinkType | string;
  onClick?: () => void;
  small?: boolean;
  image?: React.JSX.Element | string | undefined | null;
}

const defaultCardLayout = ({
  image,
  title,
  description,
  showFullDescription,
}: DashboardCardProps) => {
  let showFullDescriptionClass = "";
  if (!showFullDescription) {
    showFullDescriptionClass += " line-clamp-1";
  }

  return (
    <section className="flex w-[160px] flex-col gap-12 rounded-[18px] bg-tertiary p-12 pb-16 text-left md:w-full md:max-w-[240px] md:gap-16 md:p-16 md:pb-24">
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
          className={cn(
            "text-sm font-medium text-gray",
            showFullDescriptionClass
          )}
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
  description,
  showFullDescription,
}: DashboardCardProps) => {
  let showFullDescriptionClass = "";
  if (showFullDescription) {
    showFullDescriptionClass += " md:block";
  } else {
    showFullDescriptionClass += " md:line-clamp-1";
  }

  return (
    <section className="flex w-full flex-row items-center gap-12 overflow-hidden rounded-md bg-tertiary text-left md:flex md:w-full md:max-w-[240px] md:flex-col md:gap-16 md:rounded-[18px] md:bg-tertiary md:p-16 md:pb-24">
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
            "hidden text-sm font-medium text-gray",
            showFullDescriptionClass
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
  noClickBehavior = false,
  showFullDescription = false,
  href = "/404",
  onClick,
  small = false,
  image,
}: DashboardCardProps) => {
  if (typeof image === "string") {
    image = <img src={image} className="aspect-square h-full w-full" />;
  }

  const card = small
    ? smallCardLayout({
        image,
        title,
        description,
        showFullDescription,
      })
    : defaultCardLayout({
        image,
        title,
        description,
        showFullDescription,
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
