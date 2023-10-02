"use client";

import useAuthModal from "@/hooks/useAuthModal";
import React from "react";
import Modal from "./modal";
import SpotifyLoginButton from "./spotify-login-button";

const AuthModal = () => {
  const { onClose, isOpen } = useAuthModal();

  const onChange = (open: boolean) => {
    if (!open) {
      onClose();
    }
  };

  return (
    <Modal
      title="Welcome back!"
      description="Log in to your Spotify Premium account"
      isOpen={isOpen}
      onChange={onChange}
    >
      <SpotifyLoginButton />
    </Modal>
  );
};

export default AuthModal;
