import { DashboardShelf } from "./dashboard-shelf";
import { DashboardHeading } from "./dashboard";

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
