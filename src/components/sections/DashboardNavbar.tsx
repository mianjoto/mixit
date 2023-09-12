"use client";

import React from "react";
import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import { AppData } from "@/data/records/apps";
import { AppIcon, AppIconShapes } from "../AppIcon";
import { Apps } from "@/types/apps";
import { Heading } from "../base/Heading";
import { Text } from "../base/Text";
import { HeadingLevels } from "../../types/text";
import { AppsIcon } from "@/assets/svg";
import Navbar, { MobileNavbarWrapper } from "./Navbar";

export const DashboardNavbar = () => {
  return (
    <Navbar
      mobileNavbarContent={mobileNavbar}
      desktopNavbarContent={undefined}
    />
  );
};

const mobileNavbar = MobileNavbarWrapper(
  <NavigationMenu.Root className="flex h-full w-screen flex-col gap-24 rounded-b-[16px] bg-secondary px-16 py-24 lg:px-12 lg:py-16">
    <NavigationMenu.List className="flex flex-col gap-24">
      <div className="flex flex-row items-center gap-8">
        <AppsIcon className="h-[24px] w-[24px] text-body" />
        <Heading
          level={HeadingLevels.h2}
          className="text-lg font-bold uppercase tracking-widest"
        >
          Apps
        </Heading>
      </div>
      <div className="flex flex-col gap-16">
        {Object.values(AppData).map((app) => {
          return (
            <NavigationMenu.Item value={app.name}>
              <NavigationMenu.Link
                href={app.href}
                className="flex flex-row items-center gap-16 lg:gap-16"
              >
                <AppIcon
                  app={app.appType as Apps}
                  shape={AppIconShapes.SoftSquare}
                  className="h-[76px] w-[76px] text-background lg:h-[60px] lg:w-[60px]"
                />
                <div className="flex flex-col gap-[6px]">
                  <Heading
                    level={HeadingLevels.h2}
                    className="text-lg font-bold uppercase leading-none"
                  >
                    {app.name}
                  </Heading>
                  <Text textColor="gray" className="font-medium">
                    {app.shortDescription}
                  </Text>
                </div>
              </NavigationMenu.Link>
            </NavigationMenu.Item>
          );
        })}
      </div>
      <NavigationMenu.Indicator />
    </NavigationMenu.List>
  </NavigationMenu.Root>
);

interface ListItemProps {
  className?: string;
  children: React.ReactNode;
  title: string;
  props?: any;
  forwardedRef?: React.Ref<HTMLAnchorElement>;
}

const ListItem = React.forwardRef<HTMLAnchorElement, ListItemProps>(
  ({ className, children, title, ...props }, forwardedRef) => (
    <li>
      <NavigationMenu.Link asChild>
        <a {...props} ref={forwardedRef}>
          <div>{title}</div>
          <p>{children}</p>
        </a>
      </NavigationMenu.Link>
    </li>
  )
);

export default DashboardNavbar;
