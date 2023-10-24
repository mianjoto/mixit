import { ShuffleOption } from "@/types/mixit";
import { useEffect, useState } from "react";

export function useOptions(options: ShuffleOption[]) {
  const defaultEnabled = options.filter((option) => option?.defaultEnabled);

  const [enabledOptions, setEnabledOptions] =
    useState<ShuffleOption[]>(defaultEnabled);

  const toggleOption = (option: ShuffleOption) => {
    setEnabledOptions((prevEnabled) => {
      const newEnabled = [...prevEnabled];

      const optionIndex = newEnabled.findIndex((opt) => opt === option);
      if (optionIndex >= 0) {
        // remove option
        newEnabled.splice(optionIndex, 1);
      } else {
        // add option
        newEnabled.push(option);
      }

      return newEnabled;
    });
  };

  return {
    enabledOptions,
    toggleOption,
  };
}
