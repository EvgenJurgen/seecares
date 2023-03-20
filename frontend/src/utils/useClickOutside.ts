import { RefObject, useEffect, useRef } from "react";

export const useClickOutside = (
  ref: RefObject<HTMLElement | null>,
  onClickAway: (event: MouseEvent | TouchEvent) => void
) => {
  const savedCallback = useRef(onClickAway);

  useEffect(() => {
    savedCallback.current = onClickAway;
  }, [onClickAway]);

  useEffect(() => {
    const handler = (event: MouseEvent | TouchEvent) => {
      const { current } = ref;
      current &&
        !current.contains(event.target as Node) &&
        savedCallback.current(event);
    };

    document.addEventListener("click", handler);
    document.addEventListener("touchstart", handler);

    return () => {
      document.removeEventListener("click", handler);
      document.removeEventListener("touchstart", handler);
    };
  }, [ref]);
};