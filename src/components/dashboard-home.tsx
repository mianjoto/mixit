import { UserPlaylistShelf } from "./user-playlist-shelf";
import { AppData } from "@/data/records/apps";
import { DashboardCard } from "./dashboard-card";
import { AppIcon, AppIconShapes } from "./ui/app-icon";
import { Apps } from "@/types/apps";
import { DashboardTitle } from "./dashboard";
import { DashboardContentShelf } from "./dashboard-content-shelf";
import { UserProfileMenu } from "./user-profile-menu";

export const DashboardHome = () => {
  const appCards = Object.values(AppData).map((app) => {
    return (
      <DashboardCard
        image={
          <AppIcon app={app.appType as Apps} shape={AppIconShapes.Square} />
        }
        title={app.name}
        href={app.href}
        key={app.name}
        description={app.description}
        small
      />
    );
  });

  return (
    <>
      <div className="flex flex-row justify-between">
        <DashboardTitle className="flex-1">Ready to mix?</DashboardTitle>
        <UserProfileMenu />
      </div>
      <DashboardContentShelf headingText="Start mixing" shelfBehavior="two-col">
        {appCards}
      </DashboardContentShelf>
      <UserPlaylistShelf />
    </>
  );
};
