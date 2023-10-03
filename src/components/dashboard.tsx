import { HeadingLevels } from "@/types/text";
import { Heading } from "./ui/heading";
import { HTMLAttributes } from "react";
import { Section } from "./ui/section";
import { DashboardShelf } from "./dashboard-shelf";

interface DashboardRootLayoutProps {
  children: React.ReactNode;
}

export const DashboardRootLayout: React.FC<DashboardRootLayoutProps> = ({
  children,
}: DashboardRootLayoutProps) => {
  return (
    <Section
      fitScreenHeight
      className="flex-1 overflow-x-hidden overscroll-contain px-12 py-32 lg:px-24 lg:py-32"
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

export const DashboardHeading = ({ children }: DashboardHeadingProps) => {
  return <Heading level={HeadingLevels.h3}>{children}</Heading>;
};

export const Dashboard = DashboardRoot as typeof DashboardRoot & {
  Title: typeof DashboardTitle;
  Shelf: typeof DashboardShelf;
  Heading: typeof DashboardHeading;
};
Dashboard.Title = DashboardTitle;
Dashboard.Shelf = DashboardShelf;
Dashboard.Heading = DashboardHeading;
