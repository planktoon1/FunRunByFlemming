import { Stage } from "@inlet/react-pixi";
import React from "react";
import styled from "styled-components";
import PixiMain from "./components/PixiMain";

const PixiContainer = styled.div`
  position: absolute;
  left: 0px;
  top: 0px;
  background-color: black;
  z-index: -1;
`;
const AppContainer = styled.div`
  color: white;
`;

function App() {
  return (
    <AppContainer>
      <div>
        <p>Fun Run By Flemming</p>
      </div>
      <PixiContainer>
        <Stage>
          <PixiMain />
        </Stage>
      </PixiContainer>
    </AppContainer>
  );
}

export default App;
