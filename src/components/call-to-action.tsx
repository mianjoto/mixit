import React from "react";
import { Section } from "./ui/section";
import { Heading } from "./ui/heading";
import { Text } from "./ui/text";
import { Button } from "./ui/button";

const CallToAction: React.FC = () => (
  <Section
    padding
    container
    fitScreenHeight
    className="flex flex-col place-content-center items-center"
  >
    <div className="mb-32 lg:mb-64">
      <Heading
        textColor="primary"
        alignment="center"
        className="mb-[10px] sm:mb-16 lg:mb-24"
      >
        Ready to shuffle for real?
      </Heading>
      <Text alignment="center" className="max-w-full">
        Click below to start mixing your favorites into something inspiring.
      </Text>
    </div>
    <Button size="cta" href="/dashboard">
      Start mixing
    </Button>
  </Section>
);
CallToAction.displayName = "Call To Action Section";

export default CallToAction;
