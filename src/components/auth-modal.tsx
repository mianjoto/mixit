import React from "react";
import Modal from "./modal";
import SpotifyLoginButton from "./spotify-login-button";

const AuthModal = () => {
  return (
    <Modal
      title="Welcome back!"
      description="Log in to your Spotify Premium account"
      onChange={() => {}}
      isOpen={false}
    >
      <SpotifyLoginButton />
    </Modal>
  );
};

export default AuthModal;
