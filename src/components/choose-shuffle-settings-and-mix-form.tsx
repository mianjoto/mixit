import { ShuffleInput, ShuffleOutput } from "@/types/mixit";
import * as ShuffleOptions from "@/data/objects/shuffle-options";
import { DashboardHeading } from "./dashboard";
import { Apps } from "@/types/apps";
import ShuffleSettings from "./shuffle-settings";
import { Text } from "@/components/ui/text";
import { Button } from "./ui/button";
import { useShufflerApp } from "../../lib/mixit-apps";
import { Session } from "next-auth";
import { useOptions } from "@/hooks/useOptions";

type ChooseShuffleSettingsAndMixProps = {
  app: Apps;
  session: Session;
  shuffleInput: ShuffleInput;
  shuffleOutput: ShuffleOutput;
};

const ChooseShuffleSettingsAndMix = ({
  app,
  session,
  shuffleInput,
  shuffleOutput,
}: ChooseShuffleSettingsAndMixProps) => {
  const selectedAppOptions = APP_OPTIONS[app];

  const { enabledOptions, toggleOption } = useOptions(selectedAppOptions);

  return (
    <section className="flex flex-col gap-20">
      <header className="flex flex-col gap-8">
        <DashboardHeading text="You're ready to mix!" />
        <Text textColor="gray" className="max-w-fit">
          For a custom mix, feel free to change settings about how {app} mixes
          your music.
        </Text>
      </header>

      <ShuffleSettings
        app={app}
        enabledOptions={enabledOptions}
        toggleOption={toggleOption}
      />

      <Button
        size="cta"
        willRedirect={false}
        onClick={() =>
          useShufflerApp({
            data: { input: shuffleInput!, output: shuffleOutput! },
            shuffleOptions: enabledOptions,
            session: session!,
          })
        }
      >
        Mix now
      </Button>
    </section>
  );
};

export const APP_OPTIONS = {
  [Apps.Shuffler]: ShuffleOptions.Shuffler,
  [Apps.Blender]: ShuffleOptions.Blender,
  [Apps.PickAndMix]: ShuffleOptions.PickAndMix,
  [Apps.TimeMachine]: ShuffleOptions.TimeMachine,
};

export default ChooseShuffleSettingsAndMix;
