import { cn } from "@/utils/helpers";
import Link, { LinkProps } from "next/link";
import { Link as LinkType } from "@/types/links";

interface LinkWrapperProps extends LinkProps {
  children: React.ReactNode;
  className?: string;
}

const LinkWrapper: React.FC<LinkWrapperProps> = (props: LinkWrapperProps) => {
  const linkWrapperStyles =
    "w-fit opacity-[85%] hover:opacity-95 focus:opacity-95 active:opacity-100";

  const hrefFromLink = (props.href as LinkType)?.href;

  const href = hrefFromLink || props.href;

  return (
    <Link
      {...props}
      className={cn(linkWrapperStyles, props.className)}
      href={href}
    >
      {props.children}
    </Link>
  );
};

export default LinkWrapper;
