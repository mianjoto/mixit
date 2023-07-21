export type SvgIconProps = {
  sizeClass?: string;
  fill?: "none" | string;
  path: React.ReactNode;
};

export default function SvgIcon({
  sizeClass = "w-fit",
  fill = "none",
  path,
}: SvgIconProps) {
  return (
    <svg className={sizeClass} fill={fill}>
      {path}
    </svg>
  );
}
