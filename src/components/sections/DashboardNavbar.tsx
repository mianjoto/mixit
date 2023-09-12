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
import { MixitLogo } from "@/assets/mixit";
import { LinkText } from "../base/LinkText";
import { Links } from "@/types/links";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "../HoverCard";
import { Button } from "../Button";

export const DashboardNavbar = () => {
  return (
    <Navbar
      mobileNavbar={{ content: mobileNavbarContent, asChild: false }}
      desktopNavbar={{ content: desktopNavbarContent(), asChild: true }}
      desktopAnchor={"left"}
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

const desktopNavbarContent = (): React.ReactElement => {
  const privacyLink = { href: Links.privacy.root.href, text: "Privacy" };
  return (
    <NavigationMenu.Root className="hidden h-screen flex-col items-center justify-between bg-tertiary px-16 py-64 lg:flex">
      <MixitLogo
        fill="#fff"
        height="auto"
        width="auto"
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
              <NavigationMenu.Item value={app.name}>
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
        <LinkText link={privacyLink} textProps={{ className: "text-xs" }} />
      </div>
    </NavigationMenu.Root>
  );
};

export default DashboardNavbar;
