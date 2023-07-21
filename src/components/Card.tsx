import applyClasses from "../utils/helpers";

export type CardSize = "auto" | "xs" | "sm" | "md" | "lg";

export type CardProps = {
  children: React.ReactNode;
  className?: string;
  size: CardSize;
  bgColorClass: string;
};

export function getCardSizeDimensions(size: CardSize) {
  switch (size) {
    case "xs":
      return { size: 16, sizeClass: "w-16 h-16", shadowLength: 8 };
    case "sm":
      return { size: 24, sizeClass: "w-24 h-24", shadowLength: 12 };
    case "md":
      return { size: 40, sizeClass: "w-40 h-40", shadowLength: 16 };
    case "lg":
      return { size: 64, sizeClass: "w-64 h-64", shadowLength: 24 };
    default:
      return { size: "auto", sizeClass: "w-auto h-auto", shadowLength: 0 };
  }
}

const classes = {
  base: "rounded-[18px]",
  background: (bgColorClass: string) => {
    return bgColorClass.startsWith("#")
      ? `bg-[${bgColorClass}]`
      : `bg-${bgColorClass}`;
  },
  shadow: (bgColorClass: string, size: CardSize) => {
    const shadowLength = getCardSizeDimensions(size).shadowLength;

    return bgColorClass.startsWith("#")
      ? `shadow-[${shadowLength}px_${shadowLength}px_0_5px_${bgColorClass}]`
      : `shadow-[${shadowLength}px_${shadowLength}px_0_5px_theme(colors.${bgColorClass}.shadow)]`;
  },
  size: (size: CardSize) => {
    return getCardSizeDimensions(size).sizeClass;
  },
};

export default function Card({
  children,
  className,
  size,
  bgColorClass,
}: CardProps) {
  return (
    <div
      className={applyClasses(`
        ${classes.base}
        ${classes.background(bgColorClass)}
        ${classes.shadow(bgColorClass, size)}
        ${classes.size(size)}
        ${className}`)}
    >
      {children}
    </div>
  );
}
