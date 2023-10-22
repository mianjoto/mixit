"use client";

import { useEffect, useState } from "react";

import AuthModal from "@/components/auth-modal";
import SelectAppModal from "@/components/select-app-modal";

interface ModalProviderProps {}

const ModalProvider: React.FC<ModalProviderProps> = ({}) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <AuthModal />
      <SelectAppModal />
    </>
  );
};

export default ModalProvider;
