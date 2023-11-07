export const useLocalStorage = (key: string) => {
  const setItem = (value: unknown) => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (error) {
      console.log(error);
      return error;
    }
  };

  const getItem = () => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : undefined;
    } catch (error) {
      console.log(error);
      return error;
    }
  };

  const removeItem = () => {
    try {
      window.localStorage.removeItem(key);
      return true;
    } catch (error) {
      console.log(error);
      return error;
    }
  };

  return { setItem, getItem, removeItem };
};
