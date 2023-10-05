import { DashboardShelf } from "./dashboard-shelf";
import { DashboardHeading } from "./dashboard";

interface DashboardContentShelfProps {
  headingText: string | undefined;
  mobileBehavior?: "default" | "one-col" | "two-col" | "three-col";
  desktopBehavior?: "shelf" | "grid";
  children: React.ReactNode | undefined;
}

export const DashboardContentShelf = ({
  headingText,
  mobileBehavior,
  desktopBehavior,
  children,
}: DashboardContentShelfProps) => {
  return (
    <section className="flex w-full flex-col gap-20 lg:gap-12">
      <DashboardHeading text={headingText} />
      <DashboardShelf
        mobileBehavior={mobileBehavior}
        desktopBehavior={desktopBehavior}
      >
        {children}
      </DashboardShelf>
    </section>
  );
};
