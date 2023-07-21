import Card, { CardSize, getCardSizeDimensions } from "./Card";
import SymbolIcon, { SymbolIconProps } from "./SymbolIcon";

type CardWithIconProps = {
  size: CardSize;
  bgColorClass: string;
  symbolName: string;
  symbolCdnClassName?: string;
};

function getIconSize(size: CardSize): number | string {
  return getCardSizeDimensions(size).size;
}

export default function CardWithSymbolIcon({
  size,
  bgColorClass,
  symbolName,
  symbolCdnClassName = "material-icons-outlined",
}: CardWithIconProps) {
  return (
    <Card size={size} bgColorClass={bgColorClass}>
      <SymbolIcon
        symbolName={symbolName}
        symbolCdnClassName={symbolCdnClassName}
        fontSize={`${getIconSize(size)}`}
      ></SymbolIcon>
    </Card>
  );
}
