import React from "react";
import { Section } from "../base/Section";
import { Pretitle } from "@/components/base/Pretitle";
import { Heading } from "../base/Heading";
import { Text } from "../base/Text";
import { HeadingLevels, TextLevels } from "@/types/text";
import { BarChartIcon } from "@/assets/svg";
import { QueueIcon } from "@/assets/svg";
import { Disc } from "../decorations/Disc";

const WhyUseMixit: React.FC = () => (
  <Section
    grid
    className="u-container min-h-screen auto-rows-min place-content-center px-32 py-64"
  >
    <div className="col-span-full mb-24">
      <div className="mb-16">
        <Pretitle>Why use Mixit</Pretitle>
        <Heading>Enjoy a new, true shuffle</Heading>
      </div>
      <Text>Spotify's shuffle can repeat songs, even in big playlists.</Text>
    </div>
    <Section
      level="figure"
      className="col-span-full flex h-fit flex-col border-l-[3px] border-[#CACACA]/10 py-16 ps-20"
    >
      <div className="mb-8 flex min-h-[30px] max-w-[30px] flex-col items-center justify-center rounded-[8px] bg-secondary">
        <BarChartIcon className="h-auto min-h-[20px] fill-accent-1" />
      </div>
      <Heading level={HeadingLevels.h3} className="pb-4 uppercase">
        How Mixit is different
      </Heading>
      <Text level={TextLevels.figcaption} textColor="gray">
        Mixit uses the Fisher-Yates shuffling algorithm to ensure a truly random
        shuffle every time.
      </Text>
    </Section>
    <div className="col-start-1 col-end-3">
      <Disc className="absolute -left-[30%] h-[50vw] w-[50vw]" />
    </div>
    <Section
      level="figure"
      className="col-span-full col-start-3 flex h-fit flex-col border-l-[3px] border-[#CACACA]/10 py-16 ps-20"
    >
      <div className="mb-8 flex min-h-[30px] max-w-[30px] flex-col items-center justify-center rounded-[8px] bg-secondary">
        <QueueIcon className="h-auto min-h-[20px] fill-accent-2" />
      </div>
      <Heading level={HeadingLevels.h3} className="pb-4 uppercase">
        Take control of your queue
      </Heading>
      <Text level={TextLevels.figcaption} textColor="gray">
        Tired of the same songs? It's time to mix things up.
      </Text>
    </Section>
  </Section>
);
WhyUseMixit.displayName = "Reasons Section";

export default WhyUseMixit;
