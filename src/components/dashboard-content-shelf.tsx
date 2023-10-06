import { DashboardShelf, DashboardShelfProps } from "./dashboard-shelf";
import { DashboardHeading } from "./dashboard";

export interface DashboardContentShelfProps extends DashboardShelfProps {
  headingText: string | undefined;
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
