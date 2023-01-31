import { useEffect, useState } from "react";

function useDebounce(value, delay) {
  const [debounce, setDebounce] = useState(value);
  useEffect(() => {
    const delayHandler = setTimeout(() => {
      setDebounce(value);
    }, delay);
    //clean up
    return () => {
      clearTimeout(delayHandler);
    };
  }, [value]);
  return debounce;
}
export default useDebounce;
