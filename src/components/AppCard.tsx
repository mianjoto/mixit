import { Card, CardProps, cardVariants } from "./Card";
import { cn } from "@/utils/helpers";
import { Heading, HeadingProps } from "./base/Heading";
import { Text, TextProps } from "./base/Text";
import { Apps } from "@/types/apps";
import { AppData } from "@/data/records/apps";
import { AppIcon, AppIconProps } from "./AppIcon";

interface AppCardProps extends React.HTMLAttributes<HTMLDivElement>, CardProps {
  app: Apps;
  appIconProps: AppIconProps;
  shortDescription?: boolean;
  headingProps?: HeadingProps;
  descriptionProps?: TextProps;
}

const AppCard = ({
  app,
  appIconProps,
  headingProps,
  descriptionProps,
  shortDescription = false,
  bgColor = "secondary",
  flexDirection = "col",
  className,
  children,
  ...props
}: AppCardProps) => {
  const selectedAppData = AppData[app];

  return (
    <Card
      bgColor={bgColor}
      flexDirection={flexDirection}
      className={cn(className)}
      {...props}
    >
      <AppIcon {...appIconProps} />
      <div className="inline-flex flex-col gap-[4px] md:gap-0">
        <Heading {...headingProps} className="uppercase">
          {selectedAppData.name}
        </Heading>
        <Text {...descriptionProps}>
          {shortDescription
            ? selectedAppData.shortDescription
            : selectedAppData.description}
        </Text>
      </div>
    </Card>
  );
};

export default AppCard;