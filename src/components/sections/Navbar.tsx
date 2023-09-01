"use client";
import { MixitLogo } from "@/assets/mixit";
import { HamburgerMenuIcon, Cross1Icon } from "@radix-ui/react-icons";

import React, { forwardRef } from "react";
import * as Accordion from "@radix-ui/react-accordion";
import { cn } from "@/utils/helpers";
import { LinkText } from "../base/LinkText";
import { Links } from "@/types/links";
import { NavbarLinks } from "@/data/objects/navbar-links";
import { HeadingLevels, TextLevels } from "@/types/text";
import Link from "next/link";
import { Heading, HeadingProps } from "../base/Heading";
import { Button } from "../Button";

const Navbar: React.FC = () => {
  return (
    <nav className="absolute z-40 flex h-[60px] w-screen flex-row bg-background px-32 py-16">
      <Accordion.Root
        type="single"
        collapsible
        className="flex flex-1 flex-row items-center justify-between"
      >
        <MixitLogo
          fill="#fff"
          height="auto"
          width="auto"
          className="w-fit max-w-[70px]"
        />
        <Accordion.Item value="item-1" className="group">
          <AccordionTrigger />
          <Accordion.Content className="absolute right-0 top-[60px] z-30 flex flex-col gap-64 overflow-hidden rounded-bl-3xl bg-background text-body data-[state=closed]:animate-slideUp data-[state=open]:animate-slideDown">
            <div className="flex flex-col items-end gap-40 px-32 py-64">
              <div className="flex flex-col items-end gap-20">
                {NavbarLinks.map((link) => (
                  <LinkText
                    link={link}
                    textProps={{
                      className: "uppercase",
                      level: HeadingLevels.h2,
                    }}
                    isHeading
                  />
                ))}
              </div>
              <Button
                variant="outline"
                size="cta"
                href={Links.apps.root.href}
                className="w-fit"
              >
                <Heading
                  className="uppercase"
                  textColor="primary"
                  alignment="center"
                  level={HeadingLevels.h2}
                >
                  Mix now
                </Heading>
              </Button>
            </div>
          </Accordion.Content>
        </Accordion.Item>
      </Accordion.Root>
    </nav>
  );
};

interface AccordionTriggerProps extends Accordion.AccordionTriggerProps {
  className?: string;
}

const AccordionTrigger = React.forwardRef<
  HTMLButtonElement,
  AccordionTriggerProps
>(({ className, ...props }: AccordionTriggerProps, forwardedRef) => {
  return (
    <Accordion.Header className="flex">
      <Accordion.Trigger
        className={className}
        {...props}
        ref={forwardedRef}
        title="Expand Navigation Bar"
      >
        <div className="flex h-[40px] w-[40px] place-items-center justify-center">
          <HamburgerMenuIcon
            className={cn(
              "h-3/5 w-3/5 text-body  group-data-[state=closed]:block group-data-[state=open]:hidden motion-safe:group-data-[state=closed]:animate-spinFadeIn motion-safe:group-data-[state=open]:animate-spinFadeOut"
            )}
            aria-hidden
          />
          <Cross1Icon
            className={cn(
              "h-3/5 w-3/5 text-body group-data-[state=open]:block group-data-[state=closed]:hidden motion-safe:group-data-[state=closed]:animate-spinFadeOut motion-safe:group-data-[state=open]:animate-spinFadeIn"
            )}
            aria-hidden
          />
        </div>
      </Accordion.Trigger>
    </Accordion.Header>
  );
});

export default Navbar;
