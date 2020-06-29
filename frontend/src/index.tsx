import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { MuiThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline/CssBaseline";
import { theme } from "./utility/theme";
import WebFont from "webfontloader";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

WebFont.load({
  google: {
    families: [
      "Titillium Web:300,400,700",
      "sans-serif",
      "Balsamiq Sans:400;700",
      "Bebas Neue:400;700",
      "Special Elite:400;700",
    ],
  },
});
ReactDOM.render(
  <React.Fragment>
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </MuiThemeProvider>
  </React.Fragment>,
  document.getElementById("root")
);
