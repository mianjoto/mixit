"use client";

import React from "react";
import Modal from "./modal";
import useEarlyAccessInfoModal from "@/hooks/useEarlyAccessInfoModal";
import Link from "next/link";

const EarlyAccessInfoModal = () => {
  const { onClose, isOpen } = useEarlyAccessInfoModal();

  const onChange = (open: boolean) => {
    if (!open) {
      onClose();
    }
  };

  return (
    <Modal
      title="👋 Welcome to Mixit!"
      description=""
      isOpen={isOpen()}
      onChange={onChange}
      titleClassName={"text-left"}
    >
      <section className="mt-16 flex flex-col gap-32">
        <div className="flex flex-col gap-16">
          <p className="text-base text-body">
            Hello there! Mixit is in private development. Access to Mixit's
            tools is limited to testers for now, but feel free to look around!
          </p>

          <p className="self-start text-base font-bold text-danger">
            FYI: Logging into Spotify won't work if you're not a tester.
          </p>
        </div>

        <p className="text-sm text-body">
          If you're interested in being a tester and trying Mixit early, feel
          free to contact us{" "}
          <Link
            href="/contact"
            className="underline decoration-primary underline-offset-4"
            onClick={() => onClose()}
          >
            here
          </Link>
          .
        </p>
      </section>
    </Modal>
  );
};

export default EarlyAccessInfoModal;
