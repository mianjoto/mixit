import React from "react";
import { Section } from "./ui/section";
import { NavbarHeight } from "@/data/objects/navbar-data";
import { HeadingLevels } from "@/types/text";
import ContactForm from "./contact-form";
import { Heading } from "./ui/heading";
import { Text } from "./ui/text";

export function ContactUsSection({}) {
  return (
    <Section
      level="main"
      padding
      fitScreenHeight
      compensateForFooter
      className={`relative -top-[${NavbarHeight.mobile}] flex w-full flex-col md:w-3/5 md:items-center md:justify-center lg:top-0`}
    >
      <article className="mt-32 flex max-w-screen-md flex-col gap-20 md:mt-0">
        <div>
          <Heading
            level={HeadingLevels.h3}
            alignment="left"
            className="mb-[10px] w-full"
          >
            Contact us
          </Heading>
          <Text textColor="gray" className="w-full">
            Have feedback? Want a new feature added to Mixit? Send a message
            below, and I'll get back to you as soon as possible.
          </Text>
        </div>
        <ContactForm className="w-full" />
      </article>
    </Section>
  );
}
