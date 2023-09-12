"use client";
import { HeadingLevels } from "@/types/text";
import { HeadingProps } from "./base/Heading";
import Navbar, {
  DesktopNavbarWrapper,
  MobileNavbarWrapper,
  NavbarLinkElements,
} from "./sections/Navbar";

export const LandingNavbar = () => {
  const mobileLinkStyles: HeadingProps = {
    level: HeadingLevels.h2,
    className: "uppercase",
  };
  const desktopLinkStyles: HeadingProps = {
    level: HeadingLevels.h4,
    className: "uppercase tracking-[3px]",
  };

  const mobileNavbar = MobileNavbarWrapper(
    <div className="flex flex-col items-end gap-40 px-32 py-64">
      <div className="flex flex-col items-end gap-20">
        {NavbarLinkElements(mobileLinkStyles)}
      </div>
    </div>
  );
  const desktopNavbar = DesktopNavbarWrapper(
    <div className="flex flex-row items-center gap-64">
      {NavbarLinkElements(desktopLinkStyles)}
    </div>
  );
  return (
    <Navbar
      mobileNavbarContent={mobileNavbar}
      desktopNavbarContent={desktopNavbar}
    />
  );
};
