import { Stage } from "@inlet/react-pixi";
import React from "react";
import styled from "styled-components";
import PixiMain from "./components/PixiMain";

import Frontpage from "./pages/frontpage/Frontpage";

const PixiContainer = styled.div`
  position: absolute;
  left: 0px;
  top: 0px;
  background-color: black;
  z-index: -1;
`;
const AppContainer = styled.div`
  display: flex;
  color: white;
  margin: auto;
`;

function App() {
  return (
    <AppContainer>
      <Frontpage />
      <PixiContainer>
        <Stage>
          <PixiMain />
        </Stage>
      </PixiContainer>
    </AppContainer>
  );
}

export default App;
