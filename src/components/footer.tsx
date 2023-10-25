"use client";
import React from "react";
import { Section } from "./ui/section";
import { Heading } from "./ui/heading";
import { HeadingLevels, TextLevels } from "@/types/text";
import { UserIcon } from "@/assets/svg";
import { InfoIcon, AppsIcon } from "@/assets/svg";
import ContactForm from "./contact-form";
import { Text } from "@/components/ui/text";
import Separator from "./ui/separator";
import { AppIcon, AppIconShapes } from "./ui/app-icon";
import { Apps } from "@/types/apps";
import { AppData } from "@/data/records/apps";
import { LinkText } from "./ui/link-text";
import { FooterLinks } from "@/data/objects/footer-links";
import MixitHomeLogo from "./ui/mixit-home-logo";
import LinkWrapper from "./ui/link-wrapper";
import {
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "./ui/accordion";
import * as Accordion from "@radix-ui/react-accordion";

const appsLinks = Object.keys(AppData).map((appKey) => {
  const app = AppData[appKey as Apps];
  return (
    <LinkWrapper
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
    </LinkWrapper>
  );
});

type MobileFooterProps = { showContactForm: boolean };

const MobileFooter = ({ showContactForm = false }: MobileFooterProps) => {
  const aboutLinks = Object.values(FooterLinks.columnLinks.about.links).map(
    (linkData) => <LinkText link={linkData} key={linkData.text} />
  );
  const defaultOpenedColumns = ["item-1", "item-2"];

  let contactContent = undefined;
  if (showContactForm) {
    contactContent = (
      <AccordionContent contentGapClass="gap-[20px]" className="mt-20">
        <div>
          <Heading level={HeadingLevels.h3} className="mb-[10px]">
            Want to get in touch?
          </Heading>
          <Text textColor="gray">
            Send me a message, and I'll get back to you as soon as possible.
          </Text>
        </div>
        <ContactForm />
      </AccordionContent>
    );
  } else {
    contactContent = (
      <AccordionContent>
        {Object.values(FooterLinks.columnLinks.contact.links).map((link) => (
          <LinkText
            link={link}
            className="block"
            key={link.text}
            textProps={
              link.text === "Contact us"
                ? {
                    level: TextLevels.span,
                    underline: true,
                    underlineColor: "primary",
                  }
                : { level: TextLevels.span }
            }
          />
        ))}
      </AccordionContent>
    );
    defaultOpenedColumns.push("item-3");
  }

  return (
    <>
      <div className="lg:hidden">
        <Accordion.Root
          type="multiple"
          defaultValue={defaultOpenedColumns}
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
            {contactContent}
          </AccordionItem>
          <Separator />
        </Accordion.Root>

        <div className="mt-64 flex flex-col gap-16 sm:items-center">
          <div className="flex flex-col gap-8 sm:items-center">
            <MixitHomeLogo width="108px" />
            <LinkText
              link={FooterLinks.watermark.links.privacyPolicy}
              textProps={{ level: TextLevels.small }}
            />
          </div>

          <div className="flex flex-col sm:items-center">
            <Text level={TextLevels.small}>
              {FooterLinks.watermark.links.madeWithLove.before}
              <LinkText
                link={{
                  text: FooterLinks.watermark.links.madeWithLove.linkText,
                  href: FooterLinks.watermark.links.madeWithLove.href,
                }}
                textProps={{
                  level: TextLevels.small,
                  underline: true,
                  underlineColor: "primary",
                }}
              />
              {FooterLinks.watermark.links.madeWithLove.after}
            </Text>
          </div>
        </div>
      </div>
    </>
  );
};

export const DesktopFooter: React.FC = () => {
  return (
    <div className="hidden h-full max-h-[330px] w-full flex-1 grid-cols-[2.5fr_1.5fr_1.25fr_1fr] lg:grid">
      <div className="flex max-h-fit flex-col justify-between">
        <div className="flex flex-col gap-32">
          <MixitHomeLogo width="180px" />
          <LinkText link={FooterLinks.watermark.links.privacyPolicy} />
        </div>

        <div className="flex flex-col">
          <Text level={TextLevels.small}>
            {FooterLinks.watermark.links.madeWithLove.before}
            <LinkText
              link={{
                text: FooterLinks.watermark.links.madeWithLove.linkText,
                href: FooterLinks.watermark.links.madeWithLove.href,
              }}
              textProps={{
                level: TextLevels.small,
                underline: true,
                underlineColor: "primary",
              }}
            />
            {FooterLinks.watermark.links.madeWithLove.after}
          </Text>
        </div>
      </div>
      {Object.entries(FooterLinks.columnLinks).map(([key, value]) => (
        <div className="flex h-full flex-col gap-32" key={key}>
          <LinkText
            link={value.header.link}
            textProps={{
              level: HeadingLevels.h6,
              className: "uppercase tracking-[3px] text-body font-bold",
            }}
          />

          <div className="flex h-full flex-col gap-24">
            {/* Render logos if the app column */}
            {value.header === FooterLinks.columnLinks.apps.header
              ? appsLinks
              : Object.values(value.links).map((link) => (
                  <LinkText
                    link={link}
                    className="block"
                    key={link.text}
                    textProps={
                      link.text === "Contact us"
                        ? {
                            level: TextLevels.span,
                            underline: true,
                            underlineColor: "primary",
                          }
                        : { level: TextLevels.span }
                    }
                  />
                ))}
          </div>
        </div>
      ))}
    </div>
  );
};

type FooterProps = {
  showContactFormOnMobile?: boolean;
};

const Footer = ({ showContactFormOnMobile = false }: FooterProps) => {
  return (
    <>
      <Section
        level="footer"
        container
        padding
        className="flex flex-col justify-end lg:min-h-[80svh]"
      >
        <MobileFooter showContactForm={showContactFormOnMobile} />
        <DesktopFooter />
      </Section>
    </>
  );
};
Footer.displayName = "Footer";

export default Footer;
