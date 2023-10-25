import AppDashboardHeading from "@/components/app-dashboard-heading";
import InDevelopmentShelf from "@/components/in-development-shelf";
import { Apps } from "@/types/apps";

export default function TimeMachine() {
  const app = Apps.TimeMachine;

  return (
    <>
      <AppDashboardHeading app={app} />
      <InDevelopmentShelf app={app} />
    </>
  );
}
