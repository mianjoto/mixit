import { CardSize } from "./Card";

export type SymbolIconProps = {
  symbolName: string;
  fontSize: CardSize | string;
  color?: string;
  symbolCdnClassName?: string;
  sizeClass?: string;
};

export default function SymbolIcon({
  symbolName,
  fontSize,
  color = "background",
  symbolCdnClassName = "material-symbols-outlined",
}: SymbolIconProps) {
  return (
    <span
      className={`${symbolCdnClassName} ${color} text-${color} font-${fontSize}`}
      //   TODO handle when it's of type cardsize
    >
      {symbolName}
    </span>
  );
}
