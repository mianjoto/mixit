"use client";
import React, { forwardRef } from "react";
import { cn } from "@/utils/helpers";
import { Section } from "../base/Section";
import { Pretitle } from "@/components/base/Pretitle";
import { Heading } from "../base/Heading";
import { HeadingLevels, TextLevels } from "@/types/text";
import { BarChartIcon, ShufflerIcon, UserIcon } from "@/assets/svg";
import { QueueIcon } from "@/assets/svg";
import { Disc } from "../decorations/Disc";
import * as Accordion from "@radix-ui/react-accordion";
import { PlusIcon, InfoCircledIcon } from "@radix-ui/react-icons";
import { InfoIcon, AppsIcon } from "@/assets/svg";
import Link from "next/link";
import ContactForm from "../ContactForm";
import { Text } from "@/components/base/Text";
import { ColorData } from "@/types/colors";
import Separator from "../Separator";
import { AppIcon, AppIconShapes, AppIconProps } from "../AppIcon";
import { Apps } from "@/types/apps";
import AppCard from "../AppCard";
import { Card } from "../Card";
import { MixitLogo } from "@/assets/mixit";

interface AccordionItemProps extends Accordion.AccordionItemProps {
  className?: string;
}

const AccordionItem = forwardRef<HTMLDivElement, AccordionItemProps>(
  ({ children, className, ...props }, forwardedRef) => {
    return (
      <Accordion.Item
        className={cn(
          "group overflow-hidden ring-offset-background focus-within:relative focus-within:z-10 focus-within:ring-2 focus-within:ring-body/10 focus-within:ring-offset-8",
          className
        )}
        ref={forwardedRef}
        {...props}
      >
        {children}
      </Accordion.Item>
    );
  }
);

interface AccordionTriggerProps extends Accordion.AccordionTriggerProps {
  className?: string;
}

const AccordionTrigger = forwardRef<HTMLButtonElement, AccordionTriggerProps>(
  ({ children, className, ...props }, forwardedRef) => {
    return (
      <Accordion.Header className="flex">
        <Accordion.Trigger
          className={cn(
            "group flex flex-1 cursor-default items-center justify-between py-16 text-lg font-bold uppercase leading-none text-body outline-none group-data-[state=closed]:opacity-60",
            className
          )}
          ref={forwardedRef}
          {...props}
        >
          {children}
          <PlusIcon
            className="transition-transform duration-300 ease-[cubic-bezier(0.87,_0,_0.13,_1)] group-data-[state=open]:rotate-180"
            aria-hidden
          />
        </Accordion.Trigger>
      </Accordion.Header>
    );
  }
);

interface AccordionContentProps extends Accordion.AccordionContentProps {
  className?: string;
  contentGapClass?: string;
}

const AccordionContent = forwardRef<HTMLDivElement, AccordionContentProps>(
  (
    { children, className, contentGapClass = "gap-24", ...props },
    forwardedRef
  ) => {
    return (
      <Accordion.Content
        className={cn(
          "overflow-hidden text-body data-[state=closed]:animate-slideUp data-[state=open]:animate-slideDown",
          className
        )}
        ref={forwardedRef}
        {...props}
      >
        <div className={cn(`flex flex-col py-[10px]`, contentGapClass)}>
          {children}
        </div>
      </Accordion.Content>
    );
  }
);

const Footer: React.FC = () => {
  return (
    <>
      <Section level="footer" padding>
        <Accordion.Root
          type="multiple"
          defaultValue={["item-1", "item-2"]}
          className="flex flex-col gap-24"
        >
          <MixitLogo width="104px" height="auto" fill="#fff" />
          <AccordionItem value="item-1">
            <AccordionTrigger>
              <div className="flex flex-row items-center gap-8">
                <InfoIcon />
                About
              </div>
            </AccordionTrigger>
            <AccordionContent>
              {/* TODO: Add links */}
              <Link href={"/404"} className="block">
                Why use Mixit?
              </Link>
              <Link href={"/404"} className="block">
                How does Mixit shuffle?
              </Link>
              <Link href={"/404"} className="block">
                Why does Spotify shuffle not shuffle properly?
              </Link>
              <Link href={"/404"} className="block">
                What is randomness?
              </Link>
            </AccordionContent>
          </AccordionItem>

          <Separator />

          <AccordionItem value="item-2">
            <AccordionTrigger>
              <div className="flex flex-row items-center gap-8">
                <AppsIcon />
                Apps
              </div>
            </AccordionTrigger>
            <AccordionContent>
              {/* TODO: Add API endpoints */}
              <div className="grid grid-cols-2 gap-24">
                <Link
                  href={"/shuffler"}
                  className="inline-flex flex-row items-center gap-8"
                >
                  <AppIcon
                    app={Apps.Shuffler}
                    shape={AppIconShapes.Square}
                    className="h-[20px] w-[20px] rounded-[3px] text-background"
                  />
                  Shuffler
                </Link>
                <Link
                  href={"/blender"}
                  className="inline-flex flex-row items-center gap-8"
                >
                  <AppIcon
                    app={Apps.Blender}
                    shape={AppIconShapes.Square}
                    className="h-[20px] w-[20px] rounded-[3px] text-background"
                  />
                  Blender
                </Link>
                <Link
                  href={"/pick-and-mix"}
                  className="inline-flex flex-row items-center gap-8"
                >
                  <AppIcon
                    app={Apps.PickAndMix}
                    shape={AppIconShapes.Square}
                    className="h-[20px] w-[20px] rounded-[3px] text-background"
                  />
                  Pick and Mix
                </Link>
                <Link
                  href={"/time-machine"}
                  className="inline-flex flex-row items-center gap-8"
                >
                  <AppIcon
                    app={Apps.TimeMachine}
                    shape={AppIconShapes.Square}
                    className="h-[20px] w-[20px] rounded-[3px] text-background"
                  />
                  Time Machine
                </Link>
              </div>
            </AccordionContent>
          </AccordionItem>

          <Separator />

          <AccordionItem value="item-3">
            <AccordionTrigger>
              <div className="flex flex-row items-center gap-8">
                <UserIcon fill="#fff" />
                Contact
              </div>
            </AccordionTrigger>
            <AccordionContent contentGapClass="gap-[20px]" className="mt-20">
              <div>
                <Heading level={HeadingLevels.h3} className="mb-[10px]">
                  Want to get in touch?
                </Heading>
                <Text textColor="gray">
                  Send me a message, and I'll get back to you as soon as
                  possible.
                </Text>
              </div>
              <ContactForm />
            </AccordionContent>
          </AccordionItem>
        </Accordion.Root>
      </Section>
    </>
  );
};
Footer.displayName = "Footer";

export default Footer;
