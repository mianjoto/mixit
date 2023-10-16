import * as Accordion from "@radix-ui/react-accordion";
import {
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "./ui/accordion";
import { SettingsIcon } from "@/assets/svg";
import { Apps } from "@/types/apps";
import {
  ShuffleSettingOption,
  ShuffleSettingOptionVariants,
} from "./shuffle-setting-option";
import * as ShuffleOptions from "@/data/objects/shuffle-options";
import { AppData } from "@/data/records/apps";

const APP_OPTIONS = {
  [Apps.Shuffler]: ShuffleOptions.Shuffler,
  [Apps.Blender]: ShuffleOptions.Blender,
  [Apps.PickAndMix]: ShuffleOptions.PickAndMix,
  [Apps.TimeMachine]: ShuffleOptions.TimeMachine,
};

export type ShuffleSettingsProps = { app: Apps };

const ShuffleSettings = ({ app }: ShuffleSettingsProps) => {
  const options = renderOptions(app);

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
        <AccordionContent>{options}</AccordionContent>
      </AccordionItem>
    </Accordion.Root>
  );
};

const renderOptions = (app: Apps) => {
  const selectedAppOptions = APP_OPTIONS[app];
  const selectedAppColorVariant = {
    [Apps.Shuffler]: "accent-1",
    [Apps.Blender]: "accent-2",
    [Apps.PickAndMix]: "accent-3",
    [Apps.TimeMachine]: "accent-4",
  }[app] as ShuffleSettingOptionVariants;

  const optionComponents = selectedAppOptions.map((option) => {
    return (
      <ShuffleSettingOption
        description={option.description}
        id={option.id}
        key={option.id}
        checkedBgColorVariant={selectedAppColorVariant}
      />
    );
  });

  return <ul>{optionComponents}</ul>;
};
export default ShuffleSettings;
