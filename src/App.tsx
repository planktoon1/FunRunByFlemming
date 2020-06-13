import { Stage } from "@inlet/react-pixi";
import {
  AppBar,
  IconButton,
  makeStyles,
  Toolbar,
  Typography,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import React from "react";
import styled from "styled-components";
import PixiMain from "./components/PixiMain";
import Frontpage from "./pages/frontpage/Frontpage";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

const PixiContainer = styled.div`
  position: absolute;
  left: 0px;
  top: 0px;
  background-color: black;
  z-index: -1;
`;
const AppContainer = styled.div``;

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {},
  title: {
    flexGrow: 1,
  },
}));

function App() {
  const classes = useStyles();
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
          <Route exact path="/" component={Frontpage} />
        </Switch>
      </Router>
    </AppContainer>
  );
}

export default App;
