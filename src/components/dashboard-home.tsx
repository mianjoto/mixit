import { AppData } from "@/data/records/apps";
import { DashboardCard } from "./dashboard-card";
import { AppIcon, AppIconShapes } from "./ui/app-icon";
import { Apps } from "@/types/apps";
import Link from "next/link";
import { DashboardTitle, DashboardContentShelf } from "./dashboard";

export const DashboardHome = () => {
  const appCards = Object.values(AppData).map((app) => {
    return (
      <Link href={app.href}>
        <DashboardCard
          img={
            <AppIcon app={app.appType as Apps} shape={AppIconShapes.Square} />
          }
          title={app.name}
          description={app.description}
          small
        />
      </Link>
    );
  });

  const dummyCard = (
    <DashboardCard
      img={<div className="h-full w-full bg-gray"></div>}
      title={"Playlist"}
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
      <DashboardTitle>Ready to mix?</DashboardTitle>
      <DashboardContentShelf headingText="Start mixing" shelfBehavior="two-col">
        {appCards}
      </DashboardContentShelf>
      <DashboardContentShelf headingText="Mix your playlists">
        {dummyCards}
      </DashboardContentShelf>
    </>
  );
};
