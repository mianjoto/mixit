"use client";

import { useSession } from "next-auth/react";
import { UserPlaylistShelf } from "./user-playlist-shelf";
import { useContext } from "react";
import SpotifyContext, { SpotifyContextType } from "@/contexts/spotify-context";
import { DashboardContentShelf } from "./dashboard-content-shelf";
import { Playlist } from "../../lib/spotify-query";
import SpotifyLoginButton from "./spotify-login-button";

const DashboardHomePlaylistShelves = () => {
  const { data: session } = useSession();
  const {
    user,
    playlistQueryResult: {
      playlists,
      isPlaylistQueryError: isError,
      isPlaylistQuerySuccess: isSuccess,
    },
  } = useContext(SpotifyContext) as SpotifyContextType;

  if (session === null) {
    return SIGN_IN_BUTTON_SHELF;
  }

  const playlistsAreLoading = !isSuccess || playlists === undefined;

  if (playlistsAreLoading) {
    return LOADING_SHELF;
  }

  const shelfProps = { playlists, user } as DashboardHomeShelfProps;

  return (
    <>
      <PlaylistsMadeByUserShelf {...shelfProps} />
      <AddedPlaylistsShelf {...shelfProps} />
      <BlendsPlaylistShelf {...shelfProps} />
      <MadeBySpotifyShelf {...shelfProps} />
    </>
  );
};

const SPOTIFY_ACCOUNT_ID = "spotify";

const madeBySpotify = (playlist: Playlist) =>
  playlist.owner.id === SPOTIFY_ACCOUNT_ID;

const isBlendPlaylist = (playlist: Playlist) =>
  playlist.description!.includes("A Blend of music for");

type DashboardHomeShelfProps = {
  playlists: Playlist[];
  user?: SpotifyApi.UserProfileResponse;
};

const PlaylistsMadeByUserShelf = ({
  playlists,
  user,
}: DashboardHomeShelfProps) => {
  const headingText = "Mix your playlists";

  if (user === undefined || user === null) {
    console.error(
      `Can't filter by user since the ${headingText} shelf did not receive a user`
    );
    return;
  }

  const playlistsMadeByUserFilter = (playlist: Playlist) =>
    playlist.owner.id === user.id;

  return (
    <UserPlaylistShelf
      headingText={headingText}
      playlists={playlists}
      filterFn={playlistsMadeByUserFilter}
    />
  );
};

const AddedPlaylistsShelf = ({ playlists, user }: DashboardHomeShelfProps) => {
  const headingText = "Mix playlists that you've liked";

  if (user === undefined || user === null) {
    console.error(
      `Can't filter by user since the ${headingText} shelf did not receive a user`
    );
    return;
  }

  const playlistsYouHaveAddedFilter = (playlist: Playlist) =>
    playlist.owner.id !== user.id && !madeBySpotify(playlist);

  return (
    <UserPlaylistShelf
      headingText={headingText}
      playlists={playlists}
      filterFn={playlistsYouHaveAddedFilter}
    />
  );
};

const BlendsPlaylistShelf = ({ playlists, user }: DashboardHomeShelfProps) => {
  const headingText = "Mix your Blends";

  if (user === undefined || user === null) {
    console.error(
      `Can't filter by user since the ${headingText} shelf did not receive a user`
    );
    return;
  }

  const playlistsMadeWithYourFriendsFilter = (playlist: Playlist) =>
    madeBySpotify(playlist) && isBlendPlaylist(playlist);

  return (
    <UserPlaylistShelf
      headingText={headingText}
      playlists={playlists}
      filterFn={playlistsMadeWithYourFriendsFilter}
      desktopBehavior="grid"
      mobileBehavior="two-col"
      smallCards
    />
  );
};

const MadeBySpotifyShelf = ({ playlists, user }: DashboardHomeShelfProps) => {
  const headingText = "Mix playlists made by Spotify";

  if (user === undefined || user === null) {
    console.error(
      `Can't filter by user since the ${headingText} shelf did not receive a user`
    );
    return;
  }

  const playlistsMadeBySpotifyFilter = (playlist: Playlist) =>
    madeBySpotify(playlist) && !isBlendPlaylist(playlist);

  return (
    <UserPlaylistShelf
      headingText={headingText}
      playlists={playlists}
      filterFn={playlistsMadeBySpotifyFilter}
    />
  );
};

const SIGN_IN_BUTTON_SHELF = (
  <DashboardContentShelf headingText="Sign in to mix your playlists">
    <SpotifyLoginButton />
  </DashboardContentShelf>
);

const LOADING_SHELF = (
  <DashboardContentShelf headingText={undefined}>
    {undefined}
  </DashboardContentShelf>
);

export default DashboardHomePlaylistShelves;
