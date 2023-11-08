"use client";

import React, { useState } from "react";
import Modal from "./modal";
import useEarlyAccessInfoModal from "@/hooks/useEarlyAccessInfoModal";
import Link from "next/link";
import { Button } from "./ui/button";
import { Checkbox } from "./ui/checkbox";
import { useLocalStorage } from "../hooks/useLocalStorage";
import useToggle from "@/hooks/useToggle";

const DO_NOT_SHOW_INPUT_ID = "do-not-show-early-access-info-modal-again";

const EarlyAccessInfoModal = () => {
  const { getItem: getDoNotShowValue, setItem: setDoNotShowValue } =
    useLocalStorage(DO_NOT_SHOW_INPUT_ID);
  const { onClose, isOpen } = useEarlyAccessInfoModal();
  const { isChecked, toggleCheck } = useToggle();

  const onChange = (open: boolean) => {
    if (!open) {
      onClose();
    }
  };

  function handleButtonOnClick() {
    if (getDoNotShowValue() === true) {
      return;
    }

    if (isChecked) {
      setDoNotShowValue(true);
    }

    onClose();
  }

  if (getDoNotShowValue()) {
    return null;
  }

  return (
    <Modal
      title="👋 Welcome to Mixit!"
      description=""
      isOpen={isOpen}
      onChange={onChange}
      titleClassName={"text-left"}
    >
      <section className="mt-16 flex flex-col gap-[48px]">
        <div className="flex flex-col gap-16">
          <p className="text-base text-body">
            Hello there! Mixit is in private development. Access to Mixit's
            tools is limited to testers for now, but feel free to look around!
          </p>

          <p className="self-start text-base font-bold text-danger">
            FYI: Logging into Spotify won't work if you're not a tester.
          </p>

          <p className="mt-4 text-sm text-body">
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
        </div>

        <section className="flex flex-col-reverse items-center gap-16 md:w-fit md:flex-row-reverse md:self-end">
          <Button onClick={handleButtonOnClick}>Sounds good!</Button>
          <span className="flex flex-row items-center gap-8">
            <Checkbox
              id={DO_NOT_SHOW_INPUT_ID}
              className="h-16 w-16 border-body bg-tertiary data-[state=checked]:border-gray md:h-12 md:w-12"
              onClick={toggleCheck}
            />
            <label
              htmlFor={DO_NOT_SHOW_INPUT_ID}
              className="select-none self-end  text-base text-body transition-colors duration-100 peer-data-[state=checked]:text-body md:text-sm md:text-gray"
            >
              Don't show this again
            </label>
          </span>
        </section>
      </section>
    </Modal>
  );
};

export default EarlyAccessInfoModal;
