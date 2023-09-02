"use client";
import { MixitLogo } from "@/assets/mixit";
import { HamburgerMenuIcon, Cross1Icon } from "@radix-ui/react-icons";
import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import React, { useEffect, useState } from "react";
import * as Accordion from "@radix-ui/react-accordion";
import { cn } from "@/utils/helpers";
import { LinkText } from "../base/LinkText";
import { Links, Link as LinkType } from "@/types/links";
import { NavbarHeight, NavbarLinks } from "@/data/objects/navbar-data";
import { HeadingLevels, TextLevels } from "@/types/text";
import { Heading, HeadingProps } from "../base/Heading";
import { Button } from "../Button";

const Navbar: React.FC = () => {
  const mobileLinkStyles: HeadingProps = {
    level: HeadingLevels.h2,
    className: "uppercase",
  };
  const desktopLinkStyles: HeadingProps = {
    level: HeadingLevels.h4,
    className: "uppercase tracking-[3px]",
  };

  const mobileNavbar = MobileNavbar(NavbarLinkElements(mobileLinkStyles));
  const desktopNavbar = DesktopNavbar(NavbarLinkElements(desktopLinkStyles));

  const { scrollY } = useScroll();

  const [hidden, setHidden] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious();
    console.log("latest=" + latest + ", previous=" + previous);
    if (latest > previous && latest > 150) {
      setHidden(true);
    } else {
      setHidden(false);
    }
  });
  return (
    <motion.nav
      variants={{ visible: { y: 0 }, hidden: { y: "-100%" } }}
      transition={{ duration: 0.35, ease: "easeInOut" }}
      animate={hidden ? "hidden" : "visible"}
      className={cn(
        `h-${NavbarHeight.mobile}`,
        "sticky top-0 z-40 mx-auto flex h-[60px] w-screen flex-row overflow-x-hidden bg-background px-32 py-16 lg:py-32"
      )}
    >
      {mobileNavbar}
      {/* Desktop Navbar is rendered when viewport >= lg breakpoint (1024px) */}
      {desktopNavbar}
    </motion.nav>
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
  return link.href === Links.apps.root.href ? (
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
  ) : (
    <LinkText link={link} textProps={textStyle} isHeading />
  );
};

function MobileNavbar(navbarLinkElements: React.ReactNode) {
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
      <Accordion.Item value="item-1" className="group">
        <AccordionTrigger />
        <Accordion.Content className="absolute right-0 top-[60px] z-30 flex flex-col gap-64 overflow-hidden rounded-bl-3xl bg-background text-body data-[state=closed]:animate-slideUp data-[state=open]:animate-slideDown">
          <div className="flex flex-col items-end gap-40 px-32 py-64">
            <div className="flex flex-col items-end gap-20">
              {navbarLinkElements}
            </div>
          </div>
        </Accordion.Content>
      </Accordion.Item>
    </Accordion.Root>
  );
}

export default Navbar;

function DesktopNavbar(navbarLinkElements: React.ReactNode) {
  return (
    <div className="u-container mx-auto hidden h-fit flex-1 flex-row items-center justify-between px-64 py-16 lg:flex">
      <MixitLogo
        fill="#fff"
        height="auto"
        width="auto"
        className="w-fit max-w-[125px]"
      />
      <div className="flex flex-row items-center gap-64 ">
        {navbarLinkElements}
      </div>
    </div>
  );
}
