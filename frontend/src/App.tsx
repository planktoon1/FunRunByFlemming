import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import styled from "styled-components";
import Frontpage from "./pages/frontpage/Frontpage";
import GlobalContextProvider from "./contexts/globalContext";
import Adminpage from "./pages/adminpage/Adminpage";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { AuthContextProvider } from "./contexts/AuthContext";

gsap.registerPlugin(ScrollTrigger);

const AppContainer = styled.div``;

function App() {
  return (
    <AppContainer>
      <Router>
        <GlobalContextProvider>
          <AuthContextProvider>
            <Switch>
              <Route path="/admin" component={Adminpage} />
              <Route path="/" component={Frontpage} />
            </Switch>
          </AuthContextProvider>
        </GlobalContextProvider>
      </Router>
    </AppContainer>
  );
}

export default App;
