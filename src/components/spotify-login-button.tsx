"use client";

import React from "react";
import { signIn } from "next-auth/react";
import { cn } from "../../lib/utils";

const SpotifyLoginButton = () => {
  const handleClick = () => {
    signIn("spotify", {
      redirect: false,
      callbackUrl: "http://localhost:3000/dashboard",
    });
  };

  const buttonStyles = cn(`
    px-24 
    py-12 
    font-bold
    text-body
    uppercase
    rounded-3xl
    bg-[#1DB954]
    transition
    duration-300
    hover:bg-[#0DA944]
    focus:bg-[#0DA944]
    focus:ring
    focus:ring-[body]
    active:bg-[#009934]
    active:ring-[body]
    active:translate-y-1
    `);

  return (
    <button onClick={handleClick} className={buttonStyles} type="button">
      Log in with Spotify
    </button>
  );
};

export default SpotifyLoginButton;
