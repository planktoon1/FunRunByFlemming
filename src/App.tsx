import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import styled from "styled-components";
import Frontpage from "./pages/frontpage/Frontpage";
import GlobalContextProvider from "./contexts/globalContext";

const AppContainer = styled.div``;

function App() {
  return (
    <AppContainer>
      <Router>
        <GlobalContextProvider>
          <Switch>
            <Route path="/" component={Frontpage} />
          </Switch>
        </GlobalContextProvider>
      </Router>
    </AppContainer>
  );
}

export default App;
