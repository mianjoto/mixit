import React, { HTMLAttributes } from "react";
import { MixitLogo } from "@/assets/mixit";
import Link from "next/link";

interface MixitIconProps extends React.SVGProps<SVGSVGElement> {}

const MixitHomeLogo: React.FC<MixitIconProps> = (props: MixitIconProps) => {
  return (
    <Link href="/" aria-label="Mixit" className="w-fit">
      <MixitLogo
        {...props}
        width={props.width ? props.width : "70px"}
        height={props.height ? props.width : "auto"}
        fill="#fff"
        className="inline"
      />
    </Link>
  );
};
MixitHomeLogo.displayName = "Mixit";

export default MixitHomeLogo;
