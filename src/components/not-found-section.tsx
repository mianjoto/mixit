import { NavbarHeight } from "@/data/objects/navbar-data";
import { Section } from "./ui/section";
import { HeadingLevels } from "@/types/text";
import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";
import { getRandomFrom } from "../../lib/utils";
import { NotFoundMessages } from "@/data/json";
import { Button } from "./ui/button";
import { Disc, RingColors } from "./disc";

const NotFoundSection = () => {
  const exclamationText = getRandomFrom(NotFoundMessages.exclamations);
  const descriptionText = getRandomFrom(NotFoundMessages.descriptions);
  const randomRingColor = getRandomFrom([
    "primary",
    "accent-1",
    "accent-2",
    "accent-3",
    "accent-4",
    "accent-5",
  ]);
  return (
    <>
      <Section
        padding
        fitScreenHeight
        compensateForFooter
        className="mx-auto grid place-items-center items-center gap-32 md:grid-flow-col md:grid-cols-[1.3fr_2.2fr] md:grid-rows-1 md:place-items-center"
      >
        <Disc
          ringColor={randomRingColor as RingColors}
          spin="clockwise"
          className="relative top-[5%] hidden h-auto justify-self-center md:block md:w-[150%]"
        />
        <Section
          level="main"
          className={
            "flex flex-col place-content-center items-center gap-56 overflow-hidden"
          }
        >
          <header className="flex flex-col gap-16">
            <Heading
              level={HeadingLevels.h1}
              alignment="center"
              textColor="primary"
            >
              {exclamationText}
            </Heading>
            <Text alignment="center">{descriptionText}</Text>
          </header>

          <Button href="/" size="cta">
            Return home
          </Button>
        </Section>
      </Section>
    </>
  );
};

export default NotFoundSection;
