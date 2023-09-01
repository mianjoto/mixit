import React, { FC } from "react";
import { Text, TextProps } from "./Text";
import Link, { LinkProps } from "next/link";
import { Link as LinkType } from "@/types/links";
import { HeadingLevels, TextLevels } from "@/types/text";
import { cn } from "@/utils/helpers";
import { Heading, HeadingProps } from "./Heading";

interface LinkTextProps {
  link: LinkType;
  textProps?: TextProps | HeadingProps;
  isHeading?: boolean;
  className?: string;
}

const LinkText: FC<LinkTextProps> = ({
  link = { href: "/404", text: "MISSING LINK, PLEASE FIX :)" },
  textProps = { level: TextLevels.span },
  isHeading = false,
  className,
  ...props
}: LinkTextProps) => {
  return (
    <Link {...props} className={cn("w-fit", className)} href={link.href}>
      {isHeading ? (
        <Heading {...(textProps as HeadingProps)}>{link.text}</Heading>
      ) : (
        <Text {...(textProps as TextProps)}>{link.text}</Text>
      )}
    </Link>
  );
};
LinkText.displayName = "Link";

export { LinkText };
