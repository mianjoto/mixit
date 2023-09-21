import { cn } from "../../../lib/utils";
import { VariantProps, cva } from "class-variance-authority";
import { Apps, Features } from "@/types/apps";
import { AppData } from "@/data/records/apps";
import { ColorData } from "@/types/colors";

export enum AppIconShapes {
  Circle,
  SquareCircle,
  SoftSquare,
  Square,
}

const appIconVariants = cva(
  "flex aspect-square h-full w-full flex-row place-content-center items-center",
  {
    variants: {
      app: {
        [Apps.Shuffler]: "bg-accent-1",
        [Apps.Blender]: "bg-accent-2",
        [Apps.PickAndMix]: "bg-accent-3",
        [Apps.TimeMachine]: "bg-accent-4",
        [Features.Queue]: "bg-accent-5",
      },
      shape: {
        [AppIconShapes.Circle]: "rounded-full",
        [AppIconShapes.SquareCircle]: "rounded-[30px]",
        [AppIconShapes.SoftSquare]: "rounded-[8px]",
        [AppIconShapes.Square]: "rounded-none",
      },
    },
    defaultVariants: {
      app: Apps.Shuffler,
      shape: AppIconShapes.SoftSquare,
    },
  }
);

export interface AppIconProps
  extends React.HTMLAttributes<HTMLImageElement>,
    VariantProps<typeof appIconVariants> {
  app: Apps;
  shape: AppIconShapes;
}

const AppIcon = ({
  app = Apps.Shuffler,
  shape,
  className,
  ...props
}: AppIconProps) => {
  const AppIconComponent = AppData[app].icon || AppIcon;

  const forceIconToCenter = (app: Apps) => {
    /* If the Blender or Time Machine icon, nudge inner icon inwards so 
       it may appear more centered. Without this translation, CSS considers
       this as perfectly centered, but the human eye perceives it as 
       off-center
   */
    if (app === Apps.Blender) {
      return "translate-x-[3%]";
    } else if (app === Apps.TimeMachine) {
      return "translate-x-[-2%]";
    }
    return "";
  };

  const translation = forceIconToCenter(app);

  return (
    <div className={cn(appIconVariants({ app, shape, className, ...props }))}>
      {AppIconComponent && (
        <AppIconComponent
          width="80%"
          height="80%"
          className={translation ?? translation}
        />
      )}
    </div>
  );
};

export { AppIcon, appIconVariants };
