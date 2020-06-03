import React, { useState, useEffect } from "react";
import { Stage } from "@inlet/react-pixi";
import PixiMain from "./components/PixiMain";
import styled from "styled-components";

const PixiContainer = styled.div`
  position: absolute;
  left: 0px;
  top: 0px;
  z-index: -1;
`;

function App() {
  const [width, setWidth] = useState(window.innerWidth);
  const [height, setHeight] = useState(window.innerHeight);

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
      setHeight(window.innerHeight);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="App">
      <div>
        <p>TEXT</p>
      </div>
      <PixiContainer>
        <Stage width={width} height={height - 4}>
          <PixiMain />
        </Stage>
      </PixiContainer>
    </div>
  );
}

export default App;
