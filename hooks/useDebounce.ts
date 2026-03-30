import { useEffect, useState } from "react";

export function useDebounce(inputValue: string) {
  const [debounceValue, setDebounceValue] = useState("");

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDebounceValue(inputValue);
    }, 300);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [inputValue]);

  return { debounceValue };
}
