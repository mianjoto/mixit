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
  href?: LinkType | string;
  onClick?: () => void;
  small?: boolean;
  image?: React.JSX.Element | string | undefined | null;
}

const defaultCardLayout = ({
  image,
  title,
  description,
}: DashboardCardProps) => {
  return (
    <section className="flex w-[200px] min-w-[200px] flex-col gap-12 rounded-[18px] bg-tertiary p-12 pb-16 text-left lg:w-[240px] lg:min-w-[240px] lg:gap-16 lg:p-16 lg:pb-24">
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
        <p className="line-clamp-1 text-sm font-medium text-gray">
          <WithSkeleton content={description} />
        </p>
      </div>
    </section>
  );
};

const smallCardLayout = ({ image, title, description }: DashboardCardProps) => {
  return (
    <section className="flex w-full flex-row items-center gap-12 overflow-hidden rounded-md bg-tertiary text-left lg:w-[240px] lg:min-w-[240px] lg:flex-col lg:gap-16 lg:rounded-[18px] lg:p-16 lg:pb-24">
      <div className="aspect-square h-[60px] w-[60px] lg:h-auto lg:w-full">
        <WithSkeleton
          content={image}
          skeletonProps={{ className: "w-full h-full" }}
        />
      </div>
      <div className="flex flex-col gap-4">
        <p className="truncate text-base font-bold uppercase text-body">
          <WithSkeleton content={title} />
        </p>
        <p className="line-clamp-1 hidden text-sm font-medium text-gray lg:block">
          <WithSkeleton content={description} />
        </p>
      </div>
    </section>
  );
};

const DashboardCardComponent = ({
  title,
  description,
  href = "/404",
  onClick,
  small = false,
  image,
}: DashboardCardProps) => {
  if (typeof image === "string") {
    image = <img src={image} />;
  }

  const card = small
    ? smallCardLayout({ image, title, description, href })
    : defaultCardLayout({ image, title, description, href });

  if (onClick) {
    return (
      <button
        type="button"
        className={cn(
          "h-fit w-fit",
          linkWrapperVariants({ isInteractive: true })
        )}
        onClick={onClick}
      >
        {card}
      </button>
    );
  }

  return (
    <LinkWrapper href={href} fitToWidth={false}>
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
