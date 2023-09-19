import { AppData } from "@/data/records/apps";
import { DashboardCard } from "./dashboard-card";
import { AppIcon, AppIconShapes } from "./ui/app-icon";
import { Apps } from "@/types/apps";
import { DashboardTitle, DashboardContentShelf } from "./dashboard";
import { UserProfileMenu } from "./user-profile-menu";
import LinkWrapper from "./ui/link-wrapper";

export const DashboardHome = () => {
  const appCards = Object.values(AppData).map((app) => {
    return (
      <DashboardCard
        img={<AppIcon app={app.appType as Apps} shape={AppIconShapes.Square} />}
        title={app.name}
        href={app.href}
        description={app.description}
        small
      />
    );
  });

  const dummyCard = (
    <DashboardCard
      img={<div className="h-full w-full bg-gray"></div>}
      title={"Playlist"}
      href={"/404"}
      description={
        "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sit excepturi earum voluptatibus quos laboriosam obcaecati recusandae quo unde modi quam nobis provident perspiciatis, a natus debitis omnis! Incidunt, quae cum."
      }
    />
  );

  const dummyCards = [];
  for (let i = 0; i < 10; i++) {
    dummyCards.push(dummyCard);
  }

  return (
    <>
      <div className="flex flex-row justify-between">
        <DashboardTitle>Ready to mix?</DashboardTitle>
        <UserProfileMenu />
      </div>
      <DashboardContentShelf headingText="Start mixing" shelfBehavior="two-col">
        {appCards}
      </DashboardContentShelf>
      <DashboardContentShelf headingText="Mix your playlists">
        {dummyCards}
      </DashboardContentShelf>
    </>
  );
};
