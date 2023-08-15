import React from "react";
import { Heading } from "@/components/base/Heading";
import { Text } from "@/components/base/Text";
import { Button } from "../Button";

export function Hero({}) {
  return (
    <>
      <div className="grid grid-cols-1 gap-8 md:col-span-1 md:grid-cols-2">
        <div>
          <Heading level="h1" textColor="primary" className="mb-40">
            Ready to mix things up?
          </Heading>
          <Text level="p" className="mb-64">
            Rediscover old favorites and reignite your playlists with Mixit.
          </Text>
          <Button size="cta">GET STARTED</Button>
        </div>
        {/* Add Disc art here */}
      </div>
    </>
  );
}
