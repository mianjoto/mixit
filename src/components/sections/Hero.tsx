import React from "react";
import { Section } from "@/components/base/Section";
import { Heading } from "@/components/base/Heading";
import { Text } from "@/components/base/Text";
import { Button } from "../Button";
import Link from "next/link";

export function Hero({}) {
  return (
    <>
      <Section level="main">
        <div className="col-span-full md:col-span-4 lg:col-span-6">
          <Heading level="h1" textColor="primary" className="mb-40">
            Ready to mix things up?
          </Heading>
          <Text level="p" className="mb-64">
            Rediscover old favorites and reignite your playlists with Mixit.
          </Text>
          <Link href="/dashboard">
            <Button size="cta">GET STARTED</Button>
          </Link>
        </div>
        <div className="col-span-full bg-primary md:col-span-4 lg:col-span-6">
          {/* Add Disc art here */}
        </div>
      </Section>
    </>
  );
}
