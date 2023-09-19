import { cn, getHref } from "@/utils/helpers";
import Link from "next/link";
import { Link as LinkType } from "@/types/links";

interface LinkWrapperProps {
  href: LinkType | string;
  children: React.ReactNode;
  className?: string;
  isInteractive?: boolean;
}

const LinkWrapper: React.FC<LinkWrapperProps> = ({
  href,
  children,
  className,
  isInteractive = true,
}: LinkWrapperProps) => {
  const linkWrapperStyles = isInteractive
    ? "opacity-[85%] hover:opacity-95 focus:opacity-95 active:opacity-100"
    : "";

  const hrefFromLink = getHref(href);

  return (
    <Link
      className={cn("w-fit", linkWrapperStyles, className)}
      href={hrefFromLink}
    >
      {children}
    </Link>
  );
};

export default LinkWrapper;
