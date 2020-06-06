import { useApp } from "@inlet/react-pixi";
import * as PIXI from "pixi.js";
import React, { useEffect } from "react";
import RunningMan from "./RunningMan";

const PixiMain: React.FC = () => {
  const spritesheet = process.env.PUBLIC_URL + "/running.json";
  const app = useApp();
  const [runningFrames, setRunningFrames] = React.useState<any[]>([]);
  // load
  useEffect(() => {
    app.loader.add(spritesheet).load((_, resource) => {
      setRunningFrames(
        Object.keys(resource[spritesheet]?.data.frames).map((frame) =>
          PIXI.Texture.from(frame)
        )
      );
    });
  }, [spritesheet, app.loader]);

  useEffect(() => {
    const resize = () => {
      app.renderer.resize(window.innerWidth, window.innerHeight - 4);
    };
    resize();
    window.addEventListener("resize", resize);
    return () => {
      window.removeEventListener("resize", resize);
    };
  }, [app.renderer]);

  app.renderer.backgroundColor = 0;
  return (
    <>
      <RunningMan frames={runningFrames} />
      <RunningMan frames={runningFrames} />
      <RunningMan frames={runningFrames} />
      <RunningMan frames={runningFrames} />
      <RunningMan frames={runningFrames} />
      <RunningMan frames={runningFrames} />
      <RunningMan frames={runningFrames} />
      <RunningMan frames={runningFrames} />
    </>
  );
};

export default PixiMain;
