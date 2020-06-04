import { PixiComponent, useApp, useTick } from "@inlet/react-pixi";
import { Graphics } from "pixi.js";
import React, { useEffect, useRef, useState } from "react";

interface RectangleProps {
  x: number;
  y: number;
  width: number;
  height: number;
  fill: number;
}

const PixiRectangle = PixiComponent<RectangleProps, Graphics>("Rectangle", {
  create: (props) => new Graphics(),
  applyProps: (instance, _, props) => {
    const { x, y, width, height, fill } = props;

    instance.clear();
    instance.beginFill(fill);
    instance.drawRect(x, y, width, height);
    instance.endFill();
  },
});
const MovingRectangle = () => {
  const iter = useRef(0);
  const [data, setData] = useState({ x: 0, y: 0 });
  const [mousePos] = useMouseClicks();
  /*
    Need to move to Y from X with Z speed...
    delta is the ms from last frame.
    speed = 10px/s
    calc pixels to move.. 
    delta/1000 * px/sec = pixels  
  */

  useTick((delta) => {
    const speed = 1;
    const pixelsToMove = (Number(delta) * speed) / 60;
    console.log(delta);

    const i = (iter.current += pixelsToMove);
    setData({ x: data.x + i, y: data.y });
  });
  return <PixiRectangle {...data} width={50} height={50} fill={0x000000} />;
};

const useMouseClicks = () => {
  const [mousePositionOnClick, setMousePosition] = useState({ x: 0, y: 0 });
  useEffect(() => {
    const printMousePos = (event) => {
      setMousePosition({ x: event.clientX, y: event.clientY });
    };
    document.addEventListener("click", printMousePos);
    return () => {
      window.removeEventListener("click", printMousePos);
    };
  }, []);

  return [mousePositionOnClick];
};

const PixiMain: React.FC = (params) => {
  const [state, setstate] = useState("inital state");
  const app = useApp();

  // Setup app props
  app.renderer.backgroundColor = 0xffffff;
  return (
    <>
      <MovingRectangle />
    </>
  );
};

export default PixiMain;
