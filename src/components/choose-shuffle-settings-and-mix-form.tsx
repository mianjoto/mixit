import { ShuffleInput, ShuffleOption, ShuffleOutput } from "@/types/mixit";
import * as ShuffleOptions from "@/data/objects/shuffle-options";
import { DashboardHeading } from "./dashboard";
import { Apps } from "@/types/apps";
import ShuffleSettings from "./shuffle-settings";
import { Text } from "@/components/ui/text";
import { Button } from "./ui/button";
import { useShufflerApp } from "../../lib/mixit-apps";
import { Session } from "next-auth";
import { useOptions } from "@/hooks/useOptions";
import { useToast } from "@/hooks/useToast";
import { OpenOnSpotifyToastAction, ToastAction } from "./ui/toast";

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
  const { toast } = useToast();

  const selectedAppOptions = APP_OPTIONS[app];

  const { enabledOptions, toggleOption } = useOptions(selectedAppOptions);

  function handleVisibleOptions(option: ShuffleOption): boolean {
    // Ignore if creating new playlist, as all options should be visible
    if (shuffleOutput.type === "new-playlist") {
      return true;
    }

    return option.id !== ShuffleOptions.PreferOlderSongs.id;
  }

  const playlistName =
    shuffleInput.type === "liked-songs"
      ? "Liked Songs"
      : shuffleInput.playlist?.name;

  async function handleSubmitButton() {
    await useShufflerApp({
      data: { input: shuffleInput!, output: shuffleOutput! },
      shuffleOptions: enabledOptions,
      session: session!,
    }).then((playlistUri) => {
      toast({
        title: "Nice mix!",
        description: `You successfully shuffled ${playlistName} using the Shuffler. Check Spotify for your new mix.`,
        action: (
          <OpenOnSpotifyToastAction
            altText={"Open playlist on Spotify"}
            uri={playlistUri?.toString()!}
          />
        ),
      });
    });
  }

  return (
    <>
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
          excludeOptionsFn={handleVisibleOptions}
          enabledOptions={enabledOptions}
          toggleOption={toggleOption}
        />
      </section>
      <Button size="default" willRedirect={false} onClick={handleSubmitButton}>
        Mix now
      </Button>
    </>
  );
};

export const APP_OPTIONS = {
  [Apps.Shuffler]: ShuffleOptions.Shuffler,
  [Apps.Blender]: ShuffleOptions.Blender,
  [Apps.PickAndMix]: ShuffleOptions.PickAndMix,
  [Apps.TimeMachine]: ShuffleOptions.TimeMachine,
};

export default ChooseShuffleSettingsAndMix;
