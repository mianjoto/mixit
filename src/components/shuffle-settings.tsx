import { SettingsIcon } from "@/assets/svg";
import { Apps } from "@/types/apps";
import { ShuffleOption } from "@/types/mixit";
import * as Accordion from "@radix-ui/react-accordion";
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";
import { Label } from "./ui/label";
import { Switch } from "./ui/switch";
import { APP_OPTIONS } from "./choose-shuffle-settings-and-mix-form";

export type ShuffleSettingsProps = {
  app: Apps;
  enabledOptions: ShuffleOption[];
  toggleOption: (option: ShuffleOption) => void;
};

const ShuffleSettings = ({
  app,
  enabledOptions,
  toggleOption,
}: ShuffleSettingsProps) => {
  const { selectedAppOptions, selectedAppColorVariant } = getOptionsForApp(app);

  return (
    <Accordion.Root
      type="multiple"
      defaultValue={["item-1", "item-2"]}
      className="flex max-w-[700px] flex-col gap-24 rounded-[16px] bg-tertiary p-16 pb-24"
    >
      <AccordionItem value="item-1">
        <AccordionTrigger>
          <div className="flex flex-row items-center gap-8">
            <SettingsIcon />
            Settings
          </div>
        </AccordionTrigger>
        <AccordionContent>
          {selectedAppOptions.map((option) => {
            console.log("Rendering ", option.id, ":", option);
            return (
              <li
                className="flex flex-row items-center justify-between"
                key={option.id}
              >
                <Label htmlFor={option.id} className="text-gray">
                  {option.description}
                </Label>
                <Switch
                  id={option.id}
                  checked={enabledOptions.includes(option)}
                  defaultChecked={option?.defaultEnabled}
                  checkedBgColor={selectedAppColorVariant}
                  onCheckedChange={() => toggleOption(option)}
                />
              </li>
            );
          })}
        </AccordionContent>
      </AccordionItem>
    </Accordion.Root>
  );
};

const getOptionsForApp = (app: Apps) => {
  const selectedAppOptions = APP_OPTIONS[app];
  const selectedAppColorVariant = {
    [Apps.Shuffler]: "accent-1",
    [Apps.Blender]: "accent-2",
    [Apps.PickAndMix]: "accent-3",
    [Apps.TimeMachine]: "accent-4",
  }[app] as "accent-1" | "accent-2" | "accent-3" | "accent-4";
  return { selectedAppOptions, selectedAppColorVariant };
};
export default ShuffleSettings;
