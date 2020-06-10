import {
  AnimatedSprite,
  Container,
  useApp,
  useTick,
  Graphics,
} from "@inlet/react-pixi";
import cloneDeep from "lodash.clonedeep";
import * as PIXI from "pixi.js";
import React, { useEffect, useState } from "react";
import { rotateToPoint } from "../utility/pixi/rotateToPoint";
import { randomNumber } from "../utility/randomNumber";

// Generate a list of colors
const Rainbow = require("rainbowvis.js");
const myRainbow = new Rainbow();
const colorCount = 16;
const COLORS: any[] = [];
myRainbow.setNumberRange(1, colorCount);
myRainbow.setSpectrum("#66FF00", "#669900");
for (var i = 1; i <= colorCount; i++) {
  COLORS.push(PIXI.utils.string2hex("#" + myRainbow.colourAt(i)));
}
interface Params {
  frames: PIXI.Texture[];
}

const RunningMan: React.FC<Params> = ({ frames }) => {
  const app = useApp();

  const [men, setMen] = useState<Man[]>([]);
  const draw = React.useCallback((g: PIXI.Graphics) => {
    g.clear();
    g.lineStyle(2, PIXI.utils.string2hex("#333333"), 1);
    g.moveTo(0, 5000);
    g.lineTo(0, -5000);

    g.endFill();
  }, []);
  useEffect(() => {
    // On click event handler
    const onMouseClick = (event) => {
      // spawn a dude at a random pos, have him run towards where the mouse clicked
      const mouseX = app.renderer.plugins.interaction.mouse.global.x;
      const mouseY = app.renderer.plugins.interaction.mouse.global.y;

      const spawnPoint = getRanPosOutsideScreenSquare();

      const newMan = {
        draw,
        speed: 3 + Math.random() * 3,
        scale: 0.5,
        tint: COLORS[Math.floor(Math.random() * COLORS.length)],
        rotation: rotateToPoint(mouseX, mouseY, spawnPoint.x, spawnPoint.y),
        ...spawnPoint,
      };

      setMen((men) => [...men, newMan]);
    };
    document.addEventListener("click", onMouseClick);
    return () => {
      window.removeEventListener("click", onMouseClick);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useTick((delta) => {
    const clonedMen = cloneDeep(men);
    let i = 0;
    for (const man of clonedMen) {
      let newX = man.x + Math.cos(man.rotation) * man.speed * delta!;
      let newY = man.y + Math.sin(man.rotation) * man.speed * delta!;
      if (isPointOutsideScreen(man.x, man.y)) {
        // Delete man
        clonedMen.splice(i, 1);
      }
      man.x = newX;
      man.y = newY;
      i++;
    }
    setMen(clonedMen);
  });

  if (frames.length === 0) {
    return null;
  }

  return (
    <Container sortableChildren={true}>
      {men.map((man, i) => {
        return (
          <>
            <Graphics
              draw={man.draw}
              zIndex={0}
              rotation={man.rotation + Math.PI * 0.5}
              x={man.x}
              y={man.y}
            />
            <AnimatedSprite
              animationSpeed={0.05 + 0.02 * man.speed}
              isPlaying={true}
              textures={frames}
              anchor={0.5}
              scale={man.scale}
              tint={man.tint}
              zIndex={3}
              rotation={man.rotation + Math.PI * 0.5}
              x={man.x}
              y={man.y}
            />
          </>
        );
      })}
    </Container>
  );
};

interface Man {
  draw?: (graphics: PIXI.Graphics) => void;
  speed: number;
  scale: number;
  tint: number;
  rotation: number;
  x: number;
  y: number;
}

function getRanPosOutsideScreenSquare() {
  const dis = 10;
  const sideOfScreen = Math.round(randomNumber(0, 3));
  let x = 0;
  let y = 0;
  switch (sideOfScreen) {
    case 0:
      y = -dis;
      x = Math.round(randomNumber(0 - dis, window.innerWidth + dis));
      break;
    case 1:
      y = Math.round(randomNumber(0 - dis, window.innerHeight + dis));
      x = window.innerWidth + dis;
      break;
    case 2:
      y = window.innerHeight + dis;
      x = Math.round(randomNumber(0 - dis, window.innerWidth + dis));
      break;
    case 3:
      y = Math.round(randomNumber(0 - dis, window.innerHeight + dis));
      x = -dis;
      break;

    default:
      break;
  }

  return { x, y };
}

// function getRanPosOutOfScreenCircle() {
//   const midX = window.innerWidth / 2;
//   const midY = window.innerHeight / 2;
//   const angle = Math.random() * Math.PI * 2;
//   const R = (midX > midY ? midX : midY) + 300;

//   const x = Math.cos(angle) * R + midX;
//   const y = Math.sin(angle) * R + midY;

//   return { x, y };
// }

function isPointOutsideScreen(x: number, y: number): boolean {
  const midX = window.innerWidth / 2;
  const midY = window.innerHeight / 2;
  const R = (midX > midY ? midX : midY) + 300;
  return Math.pow(x - midX, 2) + Math.pow(y - midY, 2) > Math.pow(R, 2);
}

export default RunningMan;
