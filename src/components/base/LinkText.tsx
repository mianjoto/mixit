import React, { FC } from "react";
import { Text, TextProps } from "./Text";
import Link, { LinkProps } from "next/link";
import { Link as LinkType } from "@/types/links";
import { TextLevels } from "@/types/text";
import { cn } from "@/utils/helpers";

interface LinkTextProps {
  href: LinkType | string;
  textProps?: TextProps;
  children?: React.ReactNode;
  className?: string;
}

const LinkText: FC<LinkTextProps> = ({
  href,
  textProps = { level: TextLevels.span },
  className,
  ...props
}: LinkTextProps) => {
  return (
    <Link
      {...props}
      className={cn("w-fit", className)}
      href={typeof href === "object" ? href.href : href}
    >
      <Text {...textProps}>{props.children}</Text>
    </Link>
  );
};
LinkText.displayName = "Link";

export { LinkText };
