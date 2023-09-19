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
import LinkWrapper from "./ui/link-wrapper";

function Features() {
  const appCards: React.JSX.Element[] = [];
  Object.keys(Apps).map((appKey) => {
    const appValue = Apps[appKey as keyof typeof Apps];

    appCards.push(
      <AppCard
        key={appValue}
        app={appValue}
        appIconProps={{
          app: appValue,
          shape: AppIconShapes.Circle,
          className:
            "max-w-[128px] max-h-128 md:max-h-[140px] md:max-w-[140px] xl:max-h-[160px] xl:max-w-[160px]",
        }}
        headingProps={{ level: HeadingLevels.h3, alignment: "center" }}
        descriptionProps={{
          level: TextLevels.p,
          alignment: "center",
          textColor: "gray",
        }}
        bgColor={"secondary"}
        flexDirection={"col"}
        className="min-w-[75%] snap-start items-center gap-16 px-24 py-16 lg:min-w-fit lg:snap-none"
      />
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
        className="col-span-full row-start-2 inline-flex w-full snap-x snap-mandatory scroll-px-16 flex-row gap-4 overflow-x-auto lg:col-span-6 lg:row-start-1 lg:grid lg:grid-cols-2 lg:grid-rows-[auto]  lg:gap-8 lg:overflow-x-hidden xl:gap-24"
      >
        {appCards}
      </Section>
      <Section className="col-span-full row-start-1 md:ps-24  lg:col-span-6 lg:flex lg:flex-col lg:justify-center xl:ps-48">
        <Pretitle>Features</Pretitle>
        <Heading className="mb-16 max-w-prose lg:mb-40">
          Take control of your music
        </Heading>
        <Text className="mb-24 max-w-prose lg:mb-64">
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
        className="col-span-full block w-full lg:hidden"
      >
        Explore all
      </Button>
    </Section>
  );
}

export default Features;
