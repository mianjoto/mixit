"use client";
import { Apps } from "@/types/apps";
import * as ToggleGroup from "@radix-ui/react-toggle-group";
import { AppFormShuffleOutput } from "@/components/app-form-shuffle-output";
import { ShuffleInput, ShuffleOutputType } from "@/types/mixit";

type ChooseShuffleOutputFormProps = {
  handleShuffleOutput: (value: ShuffleOutputType) => void;
  app: Apps;
  user: SpotifyApi.CurrentUsersProfileResponse | undefined;
  shuffleInput: ShuffleInput | null;
};

export function ChooseShuffleOutputForm({
  handleShuffleOutput,
  app,
  user,
  shuffleInput,
}: ChooseShuffleOutputFormProps) {
  return (
    <ToggleGroup.Root
      orientation="horizontal"
      asChild
      type="single"
      onValueChange={handleShuffleOutput}
    >
      <AppFormShuffleOutput
        app={app}
        user={user!}
        shuffleInput={shuffleInput!}
      />
    </ToggleGroup.Root>
  );
}
