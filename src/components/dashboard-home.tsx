import { AppData } from "@/data/records/apps";
import { DashboardCard } from "./dashboard-card";
import { AppIcon, AppIconShapes } from "./ui/app-icon";
import { Apps } from "@/types/apps";
import { DashboardTitle } from "./dashboard";
import { DashboardContentShelf } from "./dashboard-content-shelf";
import { UserProfileMenu } from "./user-profile-menu";
import DashboardHomePlaylistShelves from "./dashboard-home-playlist-shelves";

export const DashboardHome = () => {
  return (
    <>
      <header className="flex flex-row justify-between">
        <DashboardTitle text={"Ready to mix?"} className="flex-1" />
        <UserProfileMenu />
      </header>
      {APP_SHELF}
      <DashboardHomePlaylistShelves />
    </>
  );
};

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

const APP_SHELF = (
  <DashboardContentShelf headingText="Start mixing" mobileBehavior="two-col">
    {APP_CARDS}
  </DashboardContentShelf>
);
