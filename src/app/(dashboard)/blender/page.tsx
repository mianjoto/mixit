import AppDashboardHeading from "@/components/app-dashboard-heading";
import InDevelopmentShelf from "@/components/in-development-shelf";
import { Apps } from "@/types/apps";

export default function Blender() {
  const app = Apps.Blender;

  return (
    <>
      <AppDashboardHeading app={app} />
      <InDevelopmentShelf app={app} />
    </>
  );
}
