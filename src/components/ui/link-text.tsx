import React, { FC } from "react";
import { Text, TextProps } from "./text";
import LinkWrapper from "./link-wrapper";
import { Link as LinkType } from "@/types/links";
import { HeadingLevels, TextLevels } from "@/types/text";
import { cn } from "../../../lib/utils";
import { Heading, HeadingProps } from "./heading";

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
}: LinkTextProps) => {
  const textComponent = isHeading ? (
    <Heading {...(textProps as HeadingProps)}>{link.text}</Heading>
  ) : (
    <Text {...(textProps as TextProps)}>{link.text}</Text>
  );

  return (
    <LinkWrapper href={link} className={className}>
      {textComponent}
    </LinkWrapper>
  );
};
LinkText.displayName = "Link";

export { LinkText };
