import React, { HTMLAttributes } from "react";
import { MixitLogo } from "@/assets/mixit";
import Link from "next/link";
import { cn } from "../../../lib/utils";

interface MixitIconProps extends React.SVGProps<SVGSVGElement> {}

const MixitHomeLogo: React.FC<MixitIconProps> = ({
  width,
  height,
  className,
  ...props
}) => {
  return (
    <Link href="/" aria-label="Mixit" className="w-fit">
      <MixitLogo
        {...props}
        width={width ? width : "70px"}
        height={height ? height : "auto"}
        fill="#fff"
        className={cn("inline", className)}
      />
    </Link>
  );
};
MixitHomeLogo.displayName = "Mixit";

export default MixitHomeLogo;
