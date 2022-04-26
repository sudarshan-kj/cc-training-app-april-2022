import { useState, useEffect, useRef } from "react";

function usePersistence(
  localStorageKey: string,
  initValue: string
): [string, (e: string) => void] {
  const [value, setValue] = useState(
    localStorage.getItem(localStorageKey) ?? initValue
  );
  const firstRender = useRef(false);

  useEffect(() => {
    if (!firstRender.current) {
      firstRender.current = true;
      return;
    }
    localStorage.setItem(localStorageKey, value);
  }, [value]);

  return [value, setValue];
}

export default usePersistence;
