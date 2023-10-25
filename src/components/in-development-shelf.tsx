import { Apps } from "@/types/apps";
import { AppData } from "../data/records/apps";
import Link from "next/link";
import { cn, getRandomFrom } from "@/../lib/utils";
import { Links } from "@/types/links";
import { Heading } from "@/components/ui/heading";
import { HeadingLevels } from "@/types/text";
import { InDevelopmentMessages } from "@/data/json";

type InDevelopmentShelfProps = {
  app: Apps;
};

const InDevelopmentShelf = ({ app }: InDevelopmentShelfProps) => {
  const selectedAppData = AppData[app];
  const wrenchEmoji = <span className="hidden md:inline-block">🛠️</span>;
  const randomMessage = getRandomFrom(InDevelopmentMessages);

  return (
    <section className="mb-64 grid flex-1 place-content-center place-items-center gap-12 text-center">
      <header className="grid place-content-center place-items-center gap-4">
        <Heading level={HeadingLevels.h2} alignment={"center"}>
          {wrenchEmoji} {randomMessage} {wrenchEmoji}
        </Heading>

        <Heading
          level={HeadingLevels.h3}
          alignment={"center"}
          className="max-w-[30ch] text-base leading-tight"
        >
          While we develop the{" "}
          <span className={cn(selectedAppData.textColor, "cursor-not-allowed")}>
            {selectedAppData.name}
          </span>
          , try out the{" "}
          <Link href={Links.apps.Shuffler.href} className="text-accent-1">
            Shuffler
          </Link>
          .
        </Heading>
      </header>

      <p className="text-sm text-gray">
        Check out the progress on GitHub{" "}
        <Link
          href={Links.contact.repo.href}
          className={cn(
            "hover:text-body/85 text-body/75 underline underline-offset-[6px] active:text-body/95",
            selectedAppData.decorationColor
          )}
        >
          here
        </Link>
        .
      </p>
    </section>
  );
};

export default InDevelopmentShelf;
