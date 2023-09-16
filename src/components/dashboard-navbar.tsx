"use client";

import React from "react";
import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import { AppData } from "@/data/records/apps";
import { AppIcon, AppIconShapes } from "./ui/app-icon";
import { Apps } from "@/types/apps";
import { Heading } from "./ui/heading";
import { Text } from "./ui/text";
import { HeadingLevels } from "../types/text";
import { AppsIcon } from "@/assets/svg";
import Navbar, { MobileNavbarWrapper } from "./navbar";
import { LinkText } from "./ui/link-text";
import { Links } from "@/types/links";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "./ui/hover-card";
import { Button } from "./ui/button";
import Separator from "./ui/separator";
import MixitHomeLogo from "./ui/mixit-home-logo";

export const DashboardNavbar = () => {
  return (
    <Navbar
      mobileNavbar={{ content: mobileNavbarContent, asChild: false }}
      desktopNavbar={{ content: desktopNavbarContent(), asChild: true }}
      desktopAnchor={"left"}
      desktopPosition="static"
      className="lg:w-fit"
    />
  );
};

const mobileNavbarContent = MobileNavbarWrapper(
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
            <NavigationMenu.Item key={app.name} value={app.name}>
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
    <div className="flex flex-row items-center justify-center gap-16 text-center uppercase tracking-widest opacity-30">
      <LinkText link={Links.about.root} textProps={{ className: "text-xs" }} />
      <Separator orientation="vertical" className="h-[10px]" />

      <LinkText
        link={{ href: Links.privacy.root.href, text: "Privacy" }}
        textProps={{ className: "text-xs" }}
      />
    </div>
  </NavigationMenu.Root>
);

const desktopNavbarContent = (): React.ReactElement => {
  return (
    <div className="hidden h-screen w-fit items-center justify-center bg-background px-16 py-16 lg:flex">
      <NavigationMenu.Root className="flex h-full flex-col items-center justify-between rounded-2xl bg-tertiary px-16 py-64">
        <MixitHomeLogo
          fill="#fff"
          height="auto"
          width="80"
          className="h-fit w-fit max-w-[80px]"
        />
        <div className="flex flex-col gap-24 rounded-2xl bg-secondary px-[12px] py-16">
          {/* Title */}
          <div className="flex flex-row items-center gap-[5px] text-xs text-body">
            <AppsIcon className="text-base" />
            <Heading
              level={HeadingLevels.h2}
              className="text-xs font-bold uppercase tracking-widest"
            >
              Apps
            </Heading>
          </div>
          {/* Apps Buttons */}
          <NavigationMenu.List className="flex flex-col items-center gap-16">
            {Object.values(AppData).map((app) => {
              return (
                <NavigationMenu.Item key={app.name} value={app.name}>
                  <HoverCard openDelay={300} closeDelay={50}>
                    <HoverCardTrigger asChild>
                      <NavigationMenu.Link
                        href={app.href}
                        className="flex flex-row items-center gap-16 lg:gap-16"
                      >
                        <AppIcon
                          app={app.appType as Apps}
                          shape={AppIconShapes.SoftSquare}
                          className="h-[60px] w-[60px] text-background"
                        />
                      </NavigationMenu.Link>
                    </HoverCardTrigger>
                    <HoverCardContent
                      className="w-fit px-12 py-16"
                      side="right"
                      sideOffset={10}
                    >
                      <div className="flex flex-col gap-[6px]">
                        <Heading
                          level={HeadingLevels.h2}
                          className="text-base font-bold uppercase leading-none"
                        >
                          {app.name}
                        </Heading>
                        <Text textColor="gray" className="font-medium">
                          {app.shortDescription}
                        </Text>
                      </div>
                    </HoverCardContent>
                  </HoverCard>
                </NavigationMenu.Item>
              );
            })}
          </NavigationMenu.List>
        </div>
        {/* About */}
        <div className="flex flex-col items-center gap-16 text-center uppercase tracking-widest opacity-30">
          <LinkText
            link={Links.about.root}
            textProps={{ className: "text-xs" }}
          />
          <LinkText
            link={{ href: Links.privacy.root.href, text: "Privacy" }}
            textProps={{ className: "text-xs" }}
          />
        </div>
      </NavigationMenu.Root>
    </div>
  );
};

export default DashboardNavbar;
