import { HeadingLevels, TextLevels } from "@/types/text";
import AppCard from "./ui/app-card";
import { Section } from "./ui/section";
import { Apps } from "@/types/apps";
import React from "react";
import { AppIconShapes } from "./ui/app-icon";
import { Pretitle } from "./ui/pretitle";
import { Heading } from "./ui/heading";
import { Text } from "./ui/text";
import { Button } from "./ui/button";
import { AppData } from "@/data/records/apps";
import Link from "next/link";

function Features() {
  const appCards: React.JSX.Element[] = [];
  Object.keys(Apps).map((appKey) => {
    const appValue = Apps[appKey as keyof typeof Apps];
    const selectedAppData = AppData[appValue];

    appCards.push(
      <Link href={selectedAppData.href} className="min-w-[80%]">
        <AppCard
          key={appValue}
          app={appValue}
          appIconProps={{
            app: appValue,
            shape: AppIconShapes.Circle,
            className:
              "max-w-[100px] max-h-[100px] md:max-h-[140px] md:max-w-[140px] xl:max-h-[160px] xl:max-w-[160px]",
          }}
          headingProps={{
            level: HeadingLevels.h3,
            alignment: "center",
            className: "mb-4 uppercase",
          }}
          descriptionProps={{
            level: TextLevels.p,
            alignment: "center",
            textColor: "gray",
            className: "text-sm",
          }}
          bgColor={"secondary"}
          flexDirection={"col"}
          className="h-full snap-start scroll-ml-16 items-center gap-16 px-16 py-24 lg:min-w-fit lg:snap-none"
        />
      </Link>
    );
  });

  return (
    <Section
      grid
      padding
      container
      fitScreenHeight
      className="md:grid-rows-none"
    >
      <Section
        level="figure"
        className="col-span-full row-start-2 inline-flex w-full snap-x snap-mandatory scroll-px-16 flex-row gap-8 overflow-x-auto pb-4 lg:col-span-6 lg:row-start-1 lg:grid lg:grid-cols-2 lg:grid-rows-[auto]  lg:gap-8 lg:overflow-x-hidden xl:gap-24"
      >
        {appCards}
      </Section>
      <Section className="col-span-full row-start-1 md:ps-24  lg:col-span-6 lg:flex lg:flex-col lg:justify-center xl:ps-48">
        <Pretitle>Features</Pretitle>
        <Heading className="mb-16 max-w-prose lg:mb-40">
          Take control of your music
        </Heading>
        <Text className="max-w-prose lg:mb-64">
          Whether you have hundreds of Liked Songs or only three playlists,
          Mixit is your new home for shaking up your library.
        </Text>
        <Button href="/dashboard" size="cta" className="hidden w-fit lg:block">
          Explore all
        </Button>
      </Section>
      <Button
        href="/dashboard"
        size="cta"
        className="col-span-full mt-16 block w-full md:mt-0 lg:hidden"
      >
        Explore all
      </Button>
    </Section>
  );
}

export default Features;
