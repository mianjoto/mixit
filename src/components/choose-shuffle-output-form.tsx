import { Apps } from "@/types/apps";
import * as ToggleGroup from "@radix-ui/react-toggle-group";
import { ShuffleInput, ShuffleOutputType } from "@/types/mixit";
import { DashboardShelf } from "./dashboard-shelf";
import {
  AppFormCard,
  USER_NOT_OWNER_SONG_ORDER_DISABLED_REASON,
  isChooseSongOrderOutputDisabled,
} from "./app-form-card";
import { DashboardHeading } from "./dashboard";
import { useEffect, useState } from "react";

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
  const [value, setValue] = useState<string | "">("");
  const { isDisabled: songOrderIsDisabled } = isChooseSongOrderOutputDisabled(
    shuffleInput!,
    user
  );

  useEffect(() => {
    if (songOrderIsDisabled || shuffleInput?.type === "liked-songs") {
      setValue("new-playlist");
      handleShuffleOutput("new-playlist");
    }
  }, [shuffleInput]);

  return (
    <section className="flex flex-col gap-16">
      <DashboardHeading text="How do you want to shuffle?" />
      <DashboardShelf desktopBehavior={"grid"} className="py-2">
        <ToggleGroup.Root
          orientation="horizontal"
          type="single"
          value={value}
          onValueChange={(value: string) => {
            handleShuffleOutput(value as ShuffleOutputType);
            setValue(value);
          }}
          asChild
        >
          <>
            <AppFormCard.CreateNewPlaylist
              app={app}
              defaultSelected={value === "new-playlist"}
            />
            <AppFormCard.ChangeSongOrder
              app={app}
              user={user!}
              shuffleInput={shuffleInput!}
              defaultSelected={value === "song-order"}
            />
          </>
        </ToggleGroup.Root>
      </DashboardShelf>
    </section>
  );
}
