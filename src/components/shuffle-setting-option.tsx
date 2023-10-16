import { Switch } from "./ui/switch";
import { Label } from "./ui/label";
import { ShuffleSettingsProps } from "./shuffle-settings";
import { ShuffleOption } from "@/types/mixit";

export type ShuffleSettingOptionVariants =
  | "accent-1"
  | "accent-2"
  | "accent-3"
  | "accent-4";

type ShuffleSettingOptionProps = {
  checkedBgColorVariant: ShuffleSettingOptionVariants;
} & ShuffleOption;

export const ShuffleSettingOption = ({
  checkedBgColorVariant,
  description,
  id,
  defaultEnabled,
}: ShuffleSettingOptionProps) => {
  return (
    <li className="flex flex-row items-center justify-between">
      <Label htmlFor={id} className="text-gray">
        {description}
      </Label>
      <Switch
        id={id}
        defaultChecked={defaultEnabled}
        checkedBgColor={checkedBgColorVariant}
      />
    </li>
  );
};
