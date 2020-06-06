import { AnimatedSprite, Container, useApp, useTick } from "@inlet/react-pixi";
import * as PIXI from "pixi.js";
import React, { useState } from "react";
import { rotateToPoint } from "../utility/pixi/rotateToPoint";

// Generate a list of colors
const Rainbow = require("rainbowvis.js");
const myRainbow = new Rainbow();
const colorCount = 16;
const COLORS: any[] = [];
myRainbow.setNumberRange(1, colorCount);
myRainbow.setSpectrum("#d4a74d", "#ff0000");
for (var i = 1; i <= colorCount; i++) {
  COLORS.push(PIXI.utils.string2hex("#" + myRainbow.colourAt(i)));
}
interface Params {
  frames: PIXI.Texture[];
}

const RunningMan: React.FC<Params> = ({ frames }) => {
  const app = useApp();
  const [pos, setPos] = useState({ ...getRanPosOutOfScreen() });
  const [rot, setRot] = useState(0);
  const [speed, setSpeed] = useState(3 + Math.random() * 3);
  const [tint, setTint] = useState(
    COLORS[Math.floor(Math.random() * COLORS.length)]
  );

  const scale = 0.5;
  const resetDistance = 60 * scale;

  useTick((delta) => {
    const mouseX = app.renderer.plugins.interaction.mouse.global.x;
    const mouseY = app.renderer.plugins.interaction.mouse.global.y;

    const newRot = rotateToPoint(mouseX, mouseY, pos.x, pos.y);
    let newX = pos.x + Math.cos(newRot) * speed * delta!;
    let newY = pos.y + Math.sin(newRot) * speed * delta!;
    if (
      Math.abs(newY - mouseY) < resetDistance &&
      Math.abs(newX - mouseX) < resetDistance
    ) {
      // move to random position outside of screen

      const newPos = getRanPosOutOfScreen();
      newX = newPos.x;
      newY = newPos.y;
      setSpeed(3 + Math.random() * 3);
      setTint(COLORS[Math.floor(Math.random() * COLORS.length)]);
    }

    setRot(newRot + Math.PI * 0.5);
    setPos({
      x: newX,
      y: newY,
    });
  });

  if (frames.length === 0) {
    return null;
  }

  return (
    <Container rotation={rot} {...pos}>
      <AnimatedSprite
        animationSpeed={0.05 + 0.02 * speed}
        isPlaying={true}
        textures={frames}
        anchor={0.5}
        scale={scale}
        tint={tint}
      />
    </Container>
  );
};

function getRanPosOutOfScreen() {
  const midX = window.innerWidth / 2;
  const midY = window.innerHeight / 2;
  const angle = Math.random() * Math.PI * 2;
  const R = (midX > midY ? midX : midY) + 300;

  const x = Math.cos(angle) * R + midX;
  const y = Math.sin(angle) * R + midY;

  return { x, y };
}

export default RunningMan;
