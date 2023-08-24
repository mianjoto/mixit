import React from "react";
import { Section } from "@/components/base/Section";
import { Heading } from "@/components/base/Heading";
import { Text } from "@/components/base/Text";
import { Button } from "../Button";
import Link from "next/link";
import { Disc } from "../decorations/Disc";

export function Hero({}) {
  return (
    <>
      <Section
        level="main"
        className="h-screen w-full items-end overflow-x-hidden px-32 pb-64 md:grid-rows-none lg:px-64 lg:py-80"
      >
        {/* Content */}
        <div className="col-span-full row-start-2 md:col-span-6 md:row-start-1">
          <Heading level="h1" textColor="primary" className="mb-16 md:mb-40">
            Ready to mix things up?
          </Heading>
          <Text level="p" className="mb-32 md:mb-64">
            Rediscover old favorites and reignite your playlists with Mixit.
          </Text>
          <Link href="/dashboard">
            <Button size="cta">GET STARTED</Button>
          </Link>
        </div>
        {/* Disc */}
        <div className="col-span-full row-span-full row-start-1 flex flex-col items-end md:col-span-6 md:block">
          {/* -md:right-1/5 absolute -bottom-1/4 -right-[60%] col-span-full md:absolute md:col-span-6 md:h-full md:overflow-hidden */}
          <Disc
            ringColor="primary"
            spin="clockwise"
            className="relative -right-[12.5%] h-auto w-full max-w-sm overflow-x-hidden md:static md:bottom-0 md:right-0 md:max-w-4xl"
          />
        </div>
      </Section>
    </>
  );
}
