import React, { HTMLAttributes } from "react";
import { MixitLogo } from "@/assets/mixit";
import Link from "next/link";
import { cn } from "../../../lib/utils";

interface MixitIconProps extends React.SVGProps<SVGSVGElement> {
  linkToDashboard?: boolean;
}

const MixitHomeLogo: React.FC<MixitIconProps> = ({
  linkToDashboard = false,
  width,
  height,
  className,
  ...props
}) => {
  const link = linkToDashboard ? "/dashboard" : "/";

  return (
    <Link href={link} aria-label="Mixit" className="w-fit">
      <MixitLogo
        {...props}
        width={width ? width : "70px"}
        height={height ? height : null}
        fill="#fff"
        className={cn("inline", className)}
      />
    </Link>
  );
};
MixitHomeLogo.displayName = "Mixit";

export default MixitHomeLogo;
