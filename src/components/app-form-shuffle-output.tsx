import { Apps } from "@/types/apps";
import { AppFormCard } from "./app-form-card";
import { DashboardHeading } from "./dashboard";
import { DashboardShelf } from "./dashboard-shelf";
import { ShuffleInput } from "@/types/spotify";

type AppFormShuffleOutputProps = {
  app: Apps;
  user: SpotifyApi.CurrentUsersProfileResponse;
  shuffleInput: ShuffleInput;
};

export function AppFormShuffleOutput({
  app,
  user,
  shuffleInput,
}: AppFormShuffleOutputProps) {
  return (
    <section className="flex flex-col gap-16">
      <DashboardHeading text="How do you want to shuffle?" />
      <DashboardShelf desktopBehavior={"grid"} className="py-2">
        <AppFormCard.CreateNewPlaylist app={app} />
        <AppFormCard.ChangeSongOrder
          app={app}
          user={user}
          shuffleInput={shuffleInput}
        />
      </DashboardShelf>
    </section>
  );
}
