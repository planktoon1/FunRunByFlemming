import { useState, useEffect } from "react";

export const useMouseClicks = () => {
  const [mousePos, setMousePos] = useState({ x: 500, y: 500 });
  useEffect(() => {
    const onMouseClick = (event) => {
      setMousePos({ x: event.clientX, y: event.clientY });
    };
    document.addEventListener("click", onMouseClick);
    return () => {
      window.removeEventListener("click", onMouseClick);
    };
  }, []);

  return mousePos;
};
