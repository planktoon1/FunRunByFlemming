import { useState, useEffect } from "react";

export const useMouseMovement = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  useEffect(() => {
    const onMouseMove = (event) => {
      setMousePos({ x: event.clientX, y: event.clientY });
    };
    document.addEventListener("mousemove", onMouseMove);
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
    };
  }, []);

  return mousePos;
};
