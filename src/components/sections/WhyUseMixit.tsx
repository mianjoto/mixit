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
  <Section grid padding container fitScreenHeight>
    <div className="col-span-full mb-24 lg:col-span-6 lg:mb-32">
      <div className="mb-16">
        <Pretitle>Why use Mixit</Pretitle>
        <Heading>Enjoy a new, true shuffle</Heading>
      </div>
      <Text>Spotify's shuffle can repeat songs, even in big playlists.</Text>
    </div>
    <div className="col-span-full col-start-7 row-start-1 row-end-2 hidden lg:flex lg:flex-row lg:justify-end">
      <Disc
        className="h-[130%] w-auto xl:h-[160%]"
        ringColor="accent-5"
        spin="counterClockwise"
      />
    </div>

    <Section
      level="figure"
      className="col-span-full flex h-fit flex-col border-l-[3px] border-[#CACACA]/10 py-16 ps-20 lg:col-start-5 lg:self-end"
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
    <div className="col-start-1 col-end-3 row-start-3 lg:col-span-4 lg:row-span-2 lg:row-start-2">
      <Disc
        ringColor="accent-4"
        className="absolute -left-[30%] h-[50vw] w-[50vw] lg:static lg:-left-0 lg:h-auto lg:w-full lg:max-w-[700px]"
      />
    </div>

    <Section
      level="figure"
      className="col-span-full col-start-3 flex h-fit flex-col border-l-[3px] border-[#CACACA]/10 py-16 ps-20 lg:col-start-6"
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
