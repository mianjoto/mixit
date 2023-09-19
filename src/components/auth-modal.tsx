import React from "react";
import Modal from "./modal";

const AuthModal = () => {
  return (
    <Modal
      title="Welcome back!"
      description="Login to your Spotify Premium account"
      onChange={() => {}}
      isOpen
    >
      {/* Add Supabase auth here */}
    </Modal>
  );
};

export default AuthModal;
