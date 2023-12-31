"use client";
import { MixitLogo } from "@/assets/mixit";
import { HamburgerMenuIcon, Cross1Icon } from "@radix-ui/react-icons";
import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import React, { HTMLAttributes, useEffect, useRef, useState } from "react";
import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import * as Accordion from "@radix-ui/react-accordion";
import { cn } from "../../lib/utils";
import { LinkText } from "./ui/link-text";
import { Links, Link as LinkType } from "@/types/links";
import { NavbarHeight, NavbarLinks } from "@/data/objects/navbar-data";
import { HeadingLevels, TextLevels } from "@/types/text";
import { Heading, HeadingProps } from "./ui/heading";
import { Button } from "./ui/button";
import { VariantProps, cva } from "class-variance-authority";
import MixitHomeLogo from "./ui/mixit-home-logo";

let hideAccordion: boolean = false;
const VISIBILITY_THRESHOLD = 150;

const navbarVariants = cva("z-40", {
  variants: {
    position: {
      default: "sticky md:absolute",
      sticky: "sticky",
      absolute: "absolute",
      static: "static",
    },
    mobileAnchor: {
      none: "",
      top: "top-0",
      right: "right-0",
      left: "left-0",
      bottom: "bottom-0",
    },
    desktopAnchor: {
      none: "",
      top: "md:top-0",
      right: "md:right-0",
      left: "md:left-0",
      bottom: "md:bottom-0",
    },
    desktopPosition: {
      static: "md:static",
      relative: "md:relative",
      fixed: "md:fixed",
      absolute: "md:absolute",
      sticky: "md:sticky",
    },
    mobilePosition: {
      static: "static",
      relative: "relative",
      fixed: "fixed",
      absolute: "absolute",
      sticky: "sticky",
    },
  },
  defaultVariants: {
    position: "default",
    mobileAnchor: "top",
    desktopAnchor: "top",
    desktopPosition: "absolute",
    mobilePosition: "sticky",
  },
});

interface NavbarProps
  extends VariantProps<typeof navbarVariants>,
    HTMLAttributes<HTMLElement> {
  mobileNavbar: {
    content: React.ReactElement;
    asChild?: boolean;
  };
  desktopNavbar: {
    content: React.ReactElement;
    asChild?: boolean;
  };
  switchToDesktopAt?: "md" | "lg";
}

const Navbar: React.FC<NavbarProps> = ({
  position,
  mobileAnchor,
  desktopAnchor,
  desktopPosition,
  mobilePosition,
  switchToDesktopAt = "lg",
  className,
  mobileNavbar = { content: "", asChild: false },
  desktopNavbar = { content: "", asChild: false },
}) => {
  const { scrollY } = useScroll();

  const [hidden, setHidden] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious();
    if (latest > previous && latest > VISIBILITY_THRESHOLD) {
      setHidden(true);
      hideAccordion = true;
    } else {
      setHidden(false);
      hideAccordion = false;
    }
  });
  const motionDivProps = {
    variants: { visible: { y: 0 }, hidden: { y: "-100%" } },
    transition: { duration: 0.35, ease: "easeInOut" },
    animate: hidden ? "hidden" : "visible",
  };
  const desktopIsVisibleAtClass =
    switchToDesktopAt === "md" ? "md:flex" : "lg:flex";
  const mobileIsHiddenAtClass =
    switchToDesktopAt === "md" ? "md:hidden" : "lg:hidden";

  const mobileClasses = cn(
    "mx-auto flex h-[60px] w-screen flex-row bg-background px-32 py-16",
    mobileIsHiddenAtClass
  );

  const desktopClasses = cn(
    "block z-40 mx-auto hidden md:h-[60px] w-screen flex-row  bg-background px-32 py-16 md:h-fit md:py-32",
    desktopIsVisibleAtClass
  );

  return (
    <nav
      className={cn(
        "md:w-fit",
        navbarVariants({
          position,
          mobileAnchor,
          desktopAnchor,
          desktopPosition,
          mobilePosition,
        })
      )}
    >
      {mobileNavbar.asChild ? (
        mobileNavbar.content
      ) : (
        <motion.div
          {...motionDivProps}
          className={cn(mobileClasses, className)}
        >
          {mobileNavbar.content}
        </motion.div>
      )}

      {desktopNavbar.asChild ? (
        desktopNavbar.content
      ) : (
        <div className={cn(desktopClasses, className)}>
          {desktopNavbar.content}
        </div>
      )}
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
        suppressHydrationWarning
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
      key={Links.apps.root.text}
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
    <LinkText link={link} textProps={textStyle} key={link.text} isHeading />
  );
};

const MobileNavbarWrapper = (
  navbarContent: React.ReactNode,
  hiddenAt: "md" | "lg" = "lg",
  logoLinksToDashboard: boolean = false
) => {
  const hiddenAtClass = hiddenAt === "md" ? "md:hidden" : "lg:hidden";

  return (
    <Accordion.Root
      type="single"
      collapsible
      className={cn(
        "flex flex-1 flex-row items-center justify-between",
        hiddenAtClass
      )}
    >
      <MixitHomeLogo
        className="w-fit max-w-[70px]"
        linkToDashboard={logoLinksToDashboard}
      />
      <Accordion.Item value={hideAccordion ? "" : "item-1"} className="group">
        <AccordionTrigger suppressHydrationWarning />
        <Accordion.Content className="absolute right-0 top-[60px] z-30 flex flex-col gap-64 overflow-hidden rounded-bl-3xl bg-background text-body data-[state=closed]:animate-accordionSlideUp data-[state=open]:animate-accordionSlideDown">
          {navbarContent}
        </Accordion.Content>
      </Accordion.Item>
    </Accordion.Root>
  );
};

const DesktopNavbarWrapper = (navbarContent: React.ReactNode) => {
  return (
    <div className="u-container mx-auto flex h-fit flex-1 flex-row items-center justify-between px-64 py-16">
      <MixitHomeLogo width="125px" className="w-fit max-w-[125px]" />
      {navbarContent}
    </div>
  );
};

export default Navbar;

export { MobileNavbarWrapper, DesktopNavbarWrapper, NavbarLinkElements };
