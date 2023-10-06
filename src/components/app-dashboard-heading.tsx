import { AppData } from "@/data/records/apps";
import { Apps } from "@/types/apps";
import React from "react";
import { Heading } from "./ui/heading";
import { HeadingLevels } from "@/types/text";
import { cn } from "../../lib/utils";
import { AppIcon, AppIconShapes } from "./ui/app-icon";
import { UserProfileMenu } from "./user-profile-menu";

type AppDashboardHeadingProps = {
  app: Apps;
};

const AppDashboardHeading = ({ app }: AppDashboardHeadingProps) => {
  const appName = AppData[app].name;
  const appDescription = AppData[app].description;

  const headingColorClass = AppData[app].textColor;

  return (
    <section className="flex flex-row justify-between">
      <section className="flex flex-row items-center gap-16">
        <AppIcon
          app={app}
          shape={AppIconShapes.SoftSquare}
          className="aspect-square h-[72px] w-[72px]"
        />
        <header className="flex flex-col">
          <Heading
            level={HeadingLevels.h1}
            className={cn(headingColorClass, "text-xl font-bold leading-[1.2]")}
          >
            {appName}
          </Heading>
          <p className="max-w-prose text-sm text-body">{appDescription}</p>
        </header>
      </section>
      <UserProfileMenu />
    </section>
  );
};

export default AppDashboardHeading;
