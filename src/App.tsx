import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import styled from "styled-components";
import Frontpage from "./pages/frontpage/Frontpage";
import GlobalContextProvider from "./contexts/globalContext";

const AppContainer = styled.div``;

function App() {
  return (
    <AppContainer>
      <GlobalContextProvider>
        <Router>
          <Switch>
            <Route path="/" component={Frontpage} />
          </Switch>
        </Router>
      </GlobalContextProvider>
    </AppContainer>
  );
}

export default App;
