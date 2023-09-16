import { HeadingLevels } from "@/types/text";
import { Heading } from "./ui/heading";
import { HTMLAttributes } from "react";
import { Section } from "./ui/section";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { VariantProps, cva } from "class-variance-authority";
import { cn } from "@/utils/helpers";
import { ChevronDownIcon } from "@radix-ui/react-icons";
import Link from "next/link";

interface DashboardRootLayoutProps {
  children: React.ReactNode;
}

export const DashboardRootLayout: React.FC<DashboardRootLayoutProps> = ({
  children,
}: DashboardRootLayoutProps) => {
  return (
    <Section
      fitScreenHeight
      className="overflow-x-hidden px-12 py-32 lg:px-24 lg:py-32"
    >
      <DashboardRoot>{children}</DashboardRoot>
    </Section>
  );
};

interface DashboardRootProps {
  children: React.ReactNode;
}
const DashboardRoot = ({ children }: DashboardRootProps) => {
  return <div className="flex flex-col gap-24 lg:gap-32">{children}</div>;
};

interface DashboardTitleProps extends HTMLAttributes<HTMLHeadingElement> {}

export const DashboardTitle = ({ children }: DashboardTitleProps) => {
  return (
    <Heading
      level={HeadingLevels.h1}
      className="truncate text-xl text-primary lg:text-2xl "
    >
      {children}
    </Heading>
  );
};

interface DashboardHeadingProps extends HTMLAttributes<HTMLHeadingElement> {}

const DashboardHeading = ({ children }: DashboardHeadingProps) => {
  return <Heading level={HeadingLevels.h3}>{children}</Heading>;
};

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

const DashboardShelf = ({ mobileBehavior, children }: DashboardShelfProps) => {
  return (
    <section className={cn(dashboardShelfVariants({ mobileBehavior }))}>
      {children}
    </section>
  );
};

interface DashboardContentShelfProps {
  headingText: string;
  shelfBehavior?: "default" | "one-col" | "two-col" | "three-col";
  children: React.ReactNode;
}

export const DashboardContentShelf = ({
  headingText,
  shelfBehavior,
  children,
}: DashboardContentShelfProps) => {
  return (
    <section className="flex w-full flex-col gap-20 lg:gap-12">
      <DashboardHeading>{headingText}</DashboardHeading>
      <DashboardShelf mobileBehavior={shelfBehavior}>{children}</DashboardShelf>
    </section>
  );
};

export const DashboardUserMenu = () => {
  return (
    // TODO: Add API request for username information
    <section className="flex flex-row items-center gap-8">
      <Link
        href="/user"
        className="flex flex-row items-center gap-4 p-8 lg:gap-[10px]"
      >
        <Avatar className="h-24 w-24">
          <AvatarImage src="https://github.com/mianjoto.png" />
          <AvatarFallback>US</AvatarFallback>
        </Avatar>
        <p className="hidden gap-[6px] text-sm font-bold uppercase tracking-widest text-body lg:flex">
          Profile
        </p>
        <ChevronDownIcon className="inline text-body" />
      </Link>
    </section>
  );
};

export const Dashboard = DashboardRoot as typeof DashboardRoot & {
  Title: typeof DashboardTitle;
  Shelf: typeof DashboardShelf;
  Heading: typeof DashboardHeading;
};
Dashboard.Title = DashboardTitle;
Dashboard.Shelf = DashboardShelf;
Dashboard.Heading = DashboardHeading;
