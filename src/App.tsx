import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import styled from "styled-components";
import Frontpage from "./pages/frontpage/Frontpage";

// const PixiContainer = styled.div`
//   position: absolute;
//   left: 0px;
//   top: 0px;
//   background-color: black;
//   z-index: -1;
// `;
const AppContainer = styled.div``;

function App() {
  return (
    <AppContainer>
      {/* <AppBar position="static" color="secondary">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Fun Run By Flemming
          </Typography>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar> */}
      <Router>
        <Switch>
          <Route path="/" component={Frontpage} />
        </Switch>
      </Router>
    </AppContainer>
  );
}

export default App;
