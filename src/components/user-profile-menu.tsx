"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ChevronDownIcon } from "@radix-ui/react-icons";
import * as Accordion from "@radix-ui/react-accordion";
import { LinkText } from "./ui/link-text";
import { HeadingLevels } from "@/types/text";
import { Links } from "@/types/links";

export const UserProfileMenu = () => {
  return (
    // TODO: Add API request for username information
    <section className="flex flex-row items-center gap-8">
      <Accordion.Root
        type="single"
        collapsible
        className="flex flex-1 flex-row items-center justify-between"
      >
        <Accordion.Item value="user-profile" className="group">
          <Accordion.Header>
            <Accordion.Trigger className="flex flex-row items-center gap-4 p-8 lg:gap-[10px]">
              <Avatar className="h-24 w-24">
                <AvatarImage src="https://github.com/mianjoto.png" />
                <AvatarFallback>US</AvatarFallback>
              </Avatar>
              <p className="hidden gap-[6px] text-sm font-bold uppercase tracking-widest text-body lg:flex">
                Profile
              </p>
              <ChevronDownIcon className="inline text-body" />
            </Accordion.Trigger>
          </Accordion.Header>
          <Accordion.Content className="absolute right-0 z-30 flex flex-col gap-64 overflow-hidden rounded-md bg-secondary text-body data-[state=closed]:animate-accordionSlideUp data-[state=open]:animate-accordionSlideDown">
            <div className="flex w-fit flex-col gap-12 px-12 py-16 ">
              <h2 className="text-sm font-bold text-gray">
                Logged in as Username
              </h2>
              <div className="flex flex-col gap-4">
                <LinkText
                  link={Links.user.logout}
                  textProps={{
                    level: HeadingLevels.h2,
                    className: "font-bold uppercase",
                  }}
                ></LinkText>
              </div>
            </div>
          </Accordion.Content>
        </Accordion.Item>
      </Accordion.Root>
    </section>
  );
};
