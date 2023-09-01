import { AppsIcon, InfoIcon, UserIcon } from "@/assets/svg";
import { Links } from "../../types/links";
import { MixitIcon } from "@/assets/mixit";

export const FooterLinks = {
  columnLinks: {
    about: {
      header: {
        link: Links.about.root,
        icon: InfoIcon,
      },
      links: [
        Links.about.whyUseMixit,
        Links.about.mixitShuffle,
        Links.about.spotifyShuffle,
        Links.about.whatIsRandom,
      ],
    },
    apps: {
      header: {
        link: { text: "Apps", href: Links.apps.root.href },
        icon: AppsIcon,
      },
      links: [
        Links.apps.Shuffler,
        Links.apps.Blender,
        Links.apps["Pick And Mix"],
        Links.apps["Time Machine"],
      ],
    },
    contact: {
      header: {
        link: Links.contact.root,
        icon: UserIcon,
      },
      links: [
        {
          text: "Contact us",
          href: Links.contact.root.href,
        },
        Links.contact.linkedIn,
        Links.contact.github,
        Links.contact.repo,
      ],
    },
  },
  watermark: {
    header: {
      icon: MixitIcon,
    },
    links: {
      privacyPolicy: {
        text: "Privacy Policy",
        href: Links.privacy.root.href,
      },
      madeWithLove: {
        before: "Made with ❤️ by ",
        linkText: "Miguel Jover",
        after: ".",
        href: Links.contact.linkedIn.href,
      },
      repo: {
        before: "Find the code ",
        linkText: "here",
        after: ".",
        href: Links.privacy.root.href,
      },
    },
  },
};
