import { useState } from "react";

function useToggle(defaultChecked: boolean = false) {
  const [isChecked, setIsChecked] = useState(defaultChecked);

  const toggleCheck = () => setIsChecked(!isChecked);

  return { isChecked, toggleCheck };
}

export default useToggle;
