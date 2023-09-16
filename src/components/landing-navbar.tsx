"use client";
import { HeadingLevels } from "@/types/text";
import { HeadingProps } from "./ui/heading";
import Navbar, {
  DesktopNavbarWrapper,
  MobileNavbarWrapper,
  NavbarLinkElements,
} from "./navbar";

export const LandingNavbar = () => {
  const mobileLinkStyles: HeadingProps = {
    level: HeadingLevels.h2,
    className: "uppercase",
  };
  const desktopLinkStyles: HeadingProps = {
    level: HeadingLevels.h4,
    className: "uppercase tracking-[3px]",
  };

  const mobileNavbar = {
    content: MobileNavbarWrapper(
      <div className="flex flex-col items-end gap-40 px-32 py-64">
        <div className="flex flex-col items-end gap-20">
          {NavbarLinkElements(mobileLinkStyles)}
        </div>
      </div>
    ),
    asChild: false,
  };
  const desktopNavbar = {
    content: DesktopNavbarWrapper(
      <div className="flex flex-row items-center gap-64">
        {NavbarLinkElements(desktopLinkStyles)}
      </div>
    ),
    asChild: false,
  };
  return <Navbar mobileNavbar={mobileNavbar} desktopNavbar={desktopNavbar} />;
};
