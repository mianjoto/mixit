import React, { FC } from "react";
import { Text, TextProps } from "./Text";
import Link, { LinkProps } from "next/link";
import { Link as LinkType } from "@/types/links";
import { TextLevels } from "@/types/text";
import { cn } from "@/utils/helpers";
import { Heading, HeadingProps } from "./Heading";

interface LinkTextProps {
  link: LinkType;
  textProps?: TextProps | HeadingProps;
  className?: string;
}

const LinkText: FC<LinkTextProps> = ({
  link = { href: "/404", text: "MISSING LINK, PLEASE FIX :)" },
  textProps = { level: TextLevels.span },
  className,
  ...props
}: LinkTextProps) => {
  const isText: boolean = (textProps as TextProps).level !== undefined;

  return (
    <Link {...props} className={cn("w-fit", className)} href={link.href}>
      {isText ? (
        <Text {...(textProps as TextProps)}>{link.text}</Text>
      ) : (
        <Heading {...(textProps as HeadingProps)}>{link.text}</Heading>
      )}
    </Link>
  );
};
LinkText.displayName = "Link";

export { LinkText };
