import { Graphics } from "pixi.js";
import { PixiComponent, useApp } from "@inlet/react-pixi";
import React, { useState } from "react";

interface RectangleProps {
  x: number;
  y: number;
  width: number;
  height: number;
  fill: number;
}

const PixiRectangle = PixiComponent<RectangleProps, Graphics>("Rectangle", {
  create: props => new Graphics(),
  applyProps: (instance, _, props) => {
    const { x, y, width, height, fill } = props;

    instance.clear();
    instance.beginFill(fill);
    instance.drawRect(x, y, width, height);
    instance.endFill();
  }
});

const PixiMain: React.FC = params => {
  const [state, setstate] = useState("inital state");
  const app = useApp();
  // Setup app props
  app.renderer.backgroundColor = 0xffffff;
  return (
    <>
      <PixiRectangle x={50} y={50} width={50} height={50} fill={0x000000} />
    </>
  );
};

export default PixiMain;
