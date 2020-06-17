import { createMuiTheme } from "@material-ui/core/styles";
export const theme = createMuiTheme({
  palette: {
    text: {
      primary: "#000000",
      secondary: "#000000",
    },
    background: {
      default: "#ffffff",
    },
    secondary: {
      light: "#7d925c",
      main: "#506431",
      dark: "#263a08",
      contrastText: "#ffffff",
    },
    primary: {
      light: "#ffffff",
      main: "#fafafa",
      dark: "#c7c7c7",
      contrastText: "#000000",
    },
  },
  typography: {
    fontFamily: ["'Special Elite', sans-serif"].join("'"),
  },
});

theme.overrides = {
  MuiCssBaseline: {
    "@global": {
      html: {
        [theme.breakpoints.down("sm")]: {
          fontSize: "12px",
        },
      },
    },
  },
};
