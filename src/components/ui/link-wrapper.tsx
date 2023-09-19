import { cn, getHref } from "@/utils/helpers";
import Link from "next/link";
import { Link as LinkType } from "@/types/links";
import { cva } from "class-variance-authority";

interface LinkWrapperProps {
  href: LinkType | string;
  children: React.ReactNode;
  className?: string;
  isInteractive?: boolean;
  fitToWidth?: boolean;
}

const linkWrapperVariants = cva("", {
  variants: {
    isInteractive: {
      true: "opacity-[85%] hover:opacity-95 focus:opacity-95 active:opacity-100",
      false: "",
    },
    fitToWidth: {
      true: "w-fit",
      false: "",
    },
  },
  defaultVariants: {
    isInteractive: true,
    fitToWidth: true,
  },
});

const LinkWrapper: React.FC<LinkWrapperProps> = ({
  href,
  children,
  className,
  isInteractive = true,
  fitToWidth = true,
}: LinkWrapperProps) => {
  const hrefFromLink = getHref(href);

  return (
    <Link
      className={cn(
        linkWrapperVariants({ isInteractive, fitToWidth, className })
      )}
      href={hrefFromLink}
    >
      {children}
    </Link>
  );
};

export default LinkWrapper;
