import { DashboardShelf } from "./dashboard-shelf";
import { DashboardHeading } from "./dashboard";

interface DashboardContentShelfProps {
  headingText: string | undefined;
  shelfBehavior?: "default" | "one-col" | "two-col" | "three-col";
  children: React.ReactNode | undefined;
}

export const DashboardContentShelf = ({
  headingText,
  shelfBehavior,
  children,
}: DashboardContentShelfProps) => {
  return (
    <section className="flex w-full flex-col gap-20 lg:gap-12">
      <DashboardHeading text={headingText} />
      <DashboardShelf mobileBehavior={shelfBehavior}>{children}</DashboardShelf>
    </section>
  );
};
