import React from "react";
import { Section } from "@/components/base/Section";
import { Heading } from "@/components/base/Heading";
import { Text } from "@/components/base/Text";
import { Button } from "../Button";
import Link from "next/link";
import { Disc } from "../decorations/Disc";
import { HeadingLevels, TextLevels } from "@/types/text";
import { NavbarHeight } from "@/data/objects/navbar-data";

export function Hero({}) {
  return (
    <>
      <Section
        level="main"
        grid
        padding
        container
        fitScreenHeight
        className={`relative -top-[${NavbarHeight.mobile}] items-end md:grid-rows-none`}
      >
        {/* Content */}
        <div className="col-span-full row-start-2 lg:col-span-6 lg:row-start-1">
          <Heading
            level={HeadingLevels.h1}
            textColor="primary"
            className="mb-16 md:mb-40"
          >
            Ready to mix things up?
          </Heading>
          <Text level={TextLevels.p} className="mb-32 md:mb-64">
            Rediscover old favorites and reignite your playlists with Mixit.
          </Text>
          <Link href="/dashboard">
            <Button size="cta">GET STARTED</Button>
          </Link>
        </div>
        {/* Disc */}
        <div className="col-span-full row-span-full row-start-1 flex flex-col items-end lg:col-span-6 lg:block lg:h-3/4">
          <Disc
            ringColor="primary"
            spin="clockwise"
            className="relative -right-[12.5%] h-auto w-full max-w-[300px] sm:w-[clamp(31.25rem,_-81.25rem_+_150vw,_50rem)] md:max-w-2xl lg:bottom-[10vh] lg:max-w-3xl xl:bottom-[18vh] xl:right-[5%] xl:max-w-6xl"
          />
        </div>
      </Section>
    </>
  );
}
