import AppDashboardHeading from "@/components/app-dashboard-heading";
import InDevelopmentShelf from "@/components/in-development-shelf";
import { Apps } from "@/types/apps";

export default function PickAndMix() {
  const app = Apps.PickAndMix;

  return (
    <>
      <AppDashboardHeading app={app} />
      <InDevelopmentShelf app={app} />
    </>
  );
}
