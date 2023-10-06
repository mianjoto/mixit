import { HeadingLevels } from "@/types/text";
import { Heading } from "./ui/heading";
import { HTMLAttributes } from "react";
import { DashboardShelf } from "./dashboard-shelf";
import WithSkeleton from "./ui/with-skeleton";

interface DashboardRootLayoutProps {
  children: React.ReactNode;
}

export const DashboardRootLayout: React.FC<DashboardRootLayoutProps> = ({
  children,
}: DashboardRootLayoutProps) => {
  return (
    <main className="min-h-screen flex-1 overflow-x-hidden overscroll-contain px-12 py-32 lg:px-24 lg:py-32">
      <DashboardRoot>{children}</DashboardRoot>
    </main>
  );
};

interface DashboardRootProps {
  children: React.ReactNode;
}
const DashboardRoot = ({ children }: DashboardRootProps) => {
  return <div className="flex flex-col gap-32 lg:gap-[40px]">{children}</div>;
};

interface DashboardTextProps extends HTMLAttributes<HTMLHeadingElement> {
  text: string | undefined;
}

export const DashboardTitle = ({ text }: DashboardTextProps) => {
  return (
    <Heading
      level={HeadingLevels.h1}
      className="text-xl text-primary lg:text-2xl "
    >
      <WithSkeleton content={text} />
    </Heading>
  );
};

export const DashboardHeading = ({ text }: DashboardTextProps) => {
  return (
    <Heading level={HeadingLevels.h3}>
      <WithSkeleton content={text} skeletonProps={{ width: "40%" }} />
    </Heading>
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
