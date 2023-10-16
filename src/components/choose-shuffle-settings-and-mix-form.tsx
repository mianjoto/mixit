import { ShuffleInput, ShuffleOutput } from "@/types/mixit";
import { AppFormCard } from "./app-form-card";
import { DashboardHeading } from "./dashboard";
import { DashboardShelf } from "./dashboard-shelf";
import { Apps } from "@/types/apps";
import ShuffleSettings from "./shuffle-settings";
import { Text } from "@/components/ui/text";
import { Button } from "./ui/button";
import { useShufflerApp } from "../../lib/mixit";
import { Session } from "next-auth";

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
  return (
    <section className="flex flex-col gap-20">
      <header className="flex flex-col gap-8">
        <DashboardHeading text="You’re ready to mix!" />
        <Text textColor="gray" className="max-w-fit">
          For a custom mix, feel free to change settings about how {app} mixes
          your music.
        </Text>
      </header>

      <ShuffleSettings app={app} />

      <Button
        size="cta"
        willRedirect={false}
        onClick={() =>
          useShufflerApp(
            { input: shuffleInput!, output: shuffleOutput! },
            session!
          )
        }
      >
        Mix now
      </Button>
    </section>
  );
};

export default ChooseShuffleSettingsAndMix;
