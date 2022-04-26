import { useState, useEffect } from "react";

export function useDebounce(stateValue: string) {
  const [value, setValue] = useState(stateValue);

  useEffect(() => {
    const timer = setTimeout(() => {
      setValue(stateValue);
    }, 600);
    return () => clearTimeout(timer);
  }, [stateValue]);

  return value;
}
