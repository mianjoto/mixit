import { UserPlaylistShelf } from "./user-playlist-shelf";
import { AppData } from "@/data/records/apps";
import { DashboardCard } from "./dashboard-card";
import { AppIcon, AppIconShapes } from "./ui/app-icon";
import { Apps } from "@/types/apps";
import { DashboardTitle } from "./dashboard";
import { DashboardContentShelf } from "./dashboard-content-shelf";
import { UserProfileMenu } from "./user-profile-menu";

const APP_CARDS = Object.values(AppData).map((app) => {
  return (
    <DashboardCard
      image={<AppIcon app={app.appType as Apps} shape={AppIconShapes.Square} />}
      title={app.name}
      href={app.href}
      key={app.name}
      description={app.description}
      small
    />
  );
});

export const DashboardHome = () => {
  return (
    <>
      <div className="flex flex-row justify-between">
        <DashboardTitle text={"Ready to mix?"} className="flex-1" />
        <UserProfileMenu />
      </div>
      <DashboardContentShelf headingText="Start mixing" shelfBehavior="two-col">
        {APP_CARDS}
      </DashboardContentShelf>
      <UserPlaylistShelf />
    </>
  );
};
