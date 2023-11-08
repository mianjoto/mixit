"use client";

export const useLocalStorage = (key: string) => {
  const setItem = (value: unknown) => {
    try {
      if (typeof window !== "undefined") {
        window.localStorage.setItem(key, JSON.stringify(value));
        return true;
      }
    } catch (error) {
      console.log(error);
      return error;
    }
  };

  const getItem = () => {
    try {
      if (typeof window !== "undefined") {
        const item = window.localStorage.getItem(key);
        return item ? JSON.parse(item) : undefined;
      }
    } catch (error) {
      console.log(
        `Key ${key} does not exist in localStorage, returning undefined...`
      );
      return undefined;
    }
  };

  const removeItem = () => {
    try {
      if (typeof window !== "undefined") {
        window.localStorage.removeItem(key);
        return true;
      }
    } catch (error) {
      console.log(error);
      return error;
    }
  };

  return { setItem, getItem, removeItem };
};
