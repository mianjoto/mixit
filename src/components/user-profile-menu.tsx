"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ChevronDownIcon } from "@radix-ui/react-icons";
import * as Accordion from "@radix-ui/react-accordion";
import { LinkText } from "./ui/link-text";
import { HeadingLevels } from "@/types/text";
import { Links } from "@/types/links";
import { signOut, useSession } from "next-auth/react";
import { linkWrapperVariants } from "./ui/link-wrapper";
import SpotifyLoginButton from "./spotify-login-button";

const loggedInContent = (username: string) => {
  return (
    <>
      <h2 className="text-sm font-bold text-gray">Logged in as {username}</h2>
      <div className="flex flex-col gap-4">
        <button onClick={() => signOut()} className={linkWrapperVariants()}>
          <h3 className="text-base font-bold uppercase">Log out</h3>
        </button>
      </div>
    </>
  );
};

const notLoggedInContent = () => {
  return (
    <>
      <h2 className="text-sm font-bold text-gray">Log in to start mixing</h2>
      <div className="flex flex-col gap-4">
        <SpotifyLoginButton />
      </div>
    </>
  );
};

export const UserProfileMenu = () => {
  const { data } = useSession();

  const userProfilePictureSrc = data?.user.image as string;

  return (
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
                <AvatarImage src={userProfilePictureSrc} />
                <AvatarFallback></AvatarFallback>
              </Avatar>
              <p className="hidden gap-[6px] text-sm font-bold uppercase tracking-widest text-body lg:flex">
                {data?.user ? "Profile" : "Log in"}
              </p>
              <ChevronDownIcon className="inline text-body" />
            </Accordion.Trigger>
          </Accordion.Header>
          <Accordion.Content className="absolute right-0 z-30 flex flex-col gap-64 overflow-hidden rounded-md bg-secondary text-body data-[state=closed]:animate-accordionSlideUp data-[state=open]:animate-accordionSlideDown">
            <div className="flex w-fit flex-col gap-12 px-12 py-16 ">
              {data?.user
                ? loggedInContent(data?.user.name as string)
                : notLoggedInContent()}
            </div>
          </Accordion.Content>
        </Accordion.Item>
      </Accordion.Root>
    </section>
  );
};
