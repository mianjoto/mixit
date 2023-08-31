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
import { ChevronDownIcon } from "@radix-ui/react-icons";
import { InfoIcon, AppsIcon } from "@/assets/svg";
import ContactForm from "../ContactForm";
import { Text } from "@/components/base/Text";
import { ColorData } from "@/types/colors";
import Separator from "../Separator";
import { AppIcon, AppIconShapes, AppIconProps } from "../AppIcon";
import { Apps } from "@/types/apps";
import { AppData } from "@/data/records/apps";
import AppCard from "../AppCard";
import { Card } from "../Card";
import { MixitLogo } from "@/assets/mixit";
import { Links } from "@/types/links";
import { LinkText } from "../base/LinkText";
import { ContactData } from "@/data/objects/contact";
import Link from "next/link";

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
          <ChevronDownIcon
            className="text-body transition-transform duration-300 ease-[cubic-bezier(0.87,_0,_0.13,_1)] group-data-[state=open]:rotate-180"
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
const appsLinks = Object.keys(AppData).map((appKey) => {
  const app = AppData[appKey as Apps];
  return (
    <Link
      href={app.href}
      className="inline-flex w-fit flex-row items-center gap-8"
      key={appKey}
    >
      <AppIcon
        app={appKey as Apps}
        shape={AppIconShapes.Square}
        className="h-[20px] w-[20px] rounded-[3px] text-background"
      />
      <Text level={TextLevels.span}>{app.name}</Text>
    </Link>
  );
});

const MobileFooter: React.FC = () => {
  const aboutLinks = Object.values(Links.about).map((linkData) => (
    <LinkText href={linkData.href} key={linkData.text}>
      {linkData.text}
    </LinkText>
  ));

  return (
    <>
      <div className="lg:hidden">
        <Accordion.Root
          type="multiple"
          defaultValue={["item-1", "item-2"]}
          className="flex flex-col gap-24"
        >
          <AccordionItem value="item-1">
            <AccordionTrigger>
              <div className="flex flex-row items-center gap-8">
                <InfoIcon />
                About
              </div>
            </AccordionTrigger>
            <AccordionContent>{aboutLinks}</AccordionContent>
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
              <div className="grid grid-cols-2 gap-24">{appsLinks}</div>
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
          <Separator />
        </Accordion.Root>

        <div className="mt-64 flex flex-col gap-16 sm:items-center">
          <div className="flex flex-col gap-8 sm:items-center">
            <Link href={"/"} aria-label="Mixit" className="w-fit">
              <MixitLogo
                width="104px"
                height="auto"
                fill="#fff"
                className="inline"
              />
            </Link>
            <LinkText
              href={Links.privacy.privacyPolicy}
              textProps={{ level: TextLevels.small }}
            >
              Privacy Policy
            </LinkText>
          </div>

          <div className="flex flex-col sm:items-center">
            <Text level={TextLevels.small}>Made with ❤️ by Miguel Jover.</Text>
            <Text level={TextLevels.small}>
              Find the code{" "}
              <LinkText
                href={Links.contact.repo}
                textProps={{
                  level: TextLevels.small,
                  underline: true,
                  underlineColor: "primary",
                }}
              >
                here
              </LinkText>
              .
            </Text>
          </div>
        </div>
      </div>
    </>
  );
};

export const DesktopFooter: React.FC = () => {
  return (
    <div className="u-grid hidden h-full max-h-[330px] w-full flex-1 lg:grid">
      <div className="col-span-5 flex max-h-fit flex-col justify-between">
        <div className="flex flex-col gap-32">
          <Link href={"/"} aria-label="Mixit">
            <MixitLogo
              width="180px"
              height="auto"
              fill="#fff"
              className="block"
            />
          </Link>
          <LinkText href={Links.privacy.privacyPolicy}>Privacy Policy</LinkText>
        </div>

        <div className="flex flex-col">
          <Text level={TextLevels.small}>Made with ❤️ by Miguel Jover.</Text>
          <Text level={TextLevels.small}>
            Find the code{" "}
            <LinkText
              href={Links.contact.repo}
              textProps={{ level: TextLevels.small, underline: true }}
            >
              here
            </LinkText>
            .
          </Text>
        </div>
      </div>

      <div className="col-span-3 flex h-full w-4/5 flex-1 flex-col gap-32">
        <Heading
          level={HeadingLevels.h6}
          className="uppercase tracking-[3px] text-body"
        >
          About
        </Heading>

        <div className="flex h-full flex-col gap-32">
          {Object.values(Links.about).map((linkData) => (
            <LinkText
              href={linkData.href}
              className="block"
              key={linkData.text}
            >
              {linkData.text}
            </LinkText>
          ))}
        </div>
      </div>

      <div className="col-span-2 flex h-full flex-1 flex-col gap-32">
        <Heading
          level={HeadingLevels.h6}
          className="uppercase tracking-[3px] text-body"
        >
          Apps
        </Heading>

        <div className="flex h-full flex-col gap-32">{appsLinks}</div>
      </div>

      <div className="col-span-2 flex h-full flex-1 flex-col gap-32">
        <Heading
          level={HeadingLevels.h6}
          className="uppercase tracking-[3px] text-body"
        >
          Contact
        </Heading>

        <div className="flex h-full flex-col gap-32">
          {Object.values(Links.contact).map((linkData) => (
            <LinkText
              href={linkData.href}
              className="block"
              textProps={
                linkData.text === Links.contact.contactUs.text
                  ? { underline: true, underlineColor: "primary" }
                  : {}
              }
              key={linkData.text}
            >
              {linkData.text}
            </LinkText>
          ))}
        </div>
      </div>
    </div>
  );
};

const Footer: React.FC = () => {
  return (
    <>
      <Section
        level="footer"
        container
        padding
        className="flex flex-col justify-end lg:min-h-[80svh]"
      >
        <MobileFooter />
        <DesktopFooter />
      </Section>
    </>
  );
};
Footer.displayName = "Footer";

export default Footer;
