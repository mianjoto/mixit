"use client";
import { MixitLogo } from "@/assets/mixit";
import { HamburgerMenuIcon, Cross1Icon } from "@radix-ui/react-icons";
import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";
import * as Accordion from "@radix-ui/react-accordion";
import { cn } from "@/utils/helpers";
import { LinkText } from "../base/LinkText";
import { Links, Link as LinkType } from "@/types/links";
import { NavbarHeight, NavbarLinks } from "@/data/objects/navbar-data";
import { HeadingLevels, TextLevels } from "@/types/text";
import { Heading, HeadingProps } from "../base/Heading";
import { Button } from "../Button";

let hideAccordion: boolean = false;

interface NavbarProps {
  mobileNavbarContent: React.ReactElement;
  desktopNavbarContent: React.ReactElement;
}

const Navbar: React.FC<NavbarProps> = ({
  mobileNavbarContent,
  desktopNavbarContent,
}) => {
  const { scrollY } = useScroll();

  const [hidden, setHidden] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious();
    if (latest > previous && latest > 150) {
      setHidden(true);
      hideAccordion = true;
    } else {
      setHidden(false);
      hideAccordion = false;
    }
  });

  return (
    <nav className="sticky top-0 z-40 lg:absolute">
      <motion.div
        variants={{ visible: { y: 0 }, hidden: { y: "-100%" } }}
        transition={{ duration: 0.35, ease: "easeInOut" }}
        animate={hidden ? "hidden" : "visible"}
        className=" mx-auto flex h-[60px] w-screen flex-row bg-background px-32 py-16 lg:hidden"
      >
        {mobileNavbarContent}
      </motion.div>

      <div
        className={cn(
          `h-${NavbarHeight.mobile}`,
          "absolute top-0 z-40 mx-auto hidden h-[60px] w-screen flex-row  bg-background px-32 py-16 lg:flex lg:h-fit lg:py-32 "
        )}
      >
        {desktopNavbarContent}
      </div>
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

const NavbarLinkElements = (
  linkHeadingStyle: HeadingProps
): React.ReactNode => {
  return NavbarLinks.map((link) => {
    return RenderNavbarLinkElement(link, linkHeadingStyle);
  });
};

const RenderNavbarLinkElement = (
  link: LinkType,
  textStyle: HeadingProps
): React.ReactNode => {
  const mixNowButtonLink = (
    <Button
      variant="outline"
      size="default"
      href={Links.apps.root.href}
      className="w-fit"
    >
      <Heading
        className={cn("uppercase", textStyle.className)}
        textColor="primary"
        alignment="center"
        level={textStyle.level}
      >
        Mix now
      </Heading>
    </Button>
  );

  return link.href === Links.apps.root.href ? (
    mixNowButtonLink
  ) : (
    <LinkText link={link} textProps={textStyle} isHeading />
  );
};

const MobileNavbarWrapper = (navbarContent: React.ReactNode) => {
  return (
    <Accordion.Root
      type="single"
      collapsible
      className="flex flex-1 flex-row items-center justify-between lg:hidden"
    >
      <MixitLogo
        fill="#fff"
        height="auto"
        width="auto"
        className="w-fit max-w-[70px]"
      />
      <Accordion.Item value={hideAccordion ? "" : "item-1"} className="group">
        <AccordionTrigger />
        <Accordion.Content className="absolute right-0 top-[60px] z-30 flex flex-col gap-64 overflow-hidden rounded-bl-3xl bg-background text-body data-[state=closed]:animate-slideUp data-[state=open]:animate-slideDown">
          {navbarContent}
        </Accordion.Content>
      </Accordion.Item>
    </Accordion.Root>
  );
};

const DesktopNavbarWrapper = (navbarContent: React.ReactNode) => {
  return (
    <div className="u-container mx-auto flex h-fit flex-1 flex-row items-center justify-between px-64 py-16">
      <MixitLogo
        fill="#fff"
        height="auto"
        width="auto"
        className="w-fit max-w-[125px]"
      />
      {navbarContent}
    </div>
  );
};

export default Navbar;

export { MobileNavbarWrapper, DesktopNavbarWrapper, NavbarLinkElements };
