import {
  makeStyles,
  TextField,
  Select,
  MenuItem,
  Button,
} from "@material-ui/core";
import React, { useEffect } from "react";

const useStyles = makeStyles((theme) => ({
  /** Component Container */
  container: {},
  section: {
    overflowX: "hidden",
    height: "100vh",
    minHeight: "45rem",
    scrollSnapAlign: "start",
    backgroundColor: "white",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  signUpGrid: {
    display: "grid",
    gridTemplateColumns: "1fr auto auto 1fr",
    gridTemplateRows: "0.5fr auto auto 1fr",
    margin: "0 1rem",
    maxWidth: "45rem",
    height: "100vh",
    gridGap: "1.2rem",
    gridTemplateAreas: [
      '". . . ."',
      '". text text ."',
      '". form form ."',
      '". . . ."',
    ].join(""),
  },
  text: {
    gridArea: "text",
    "& h2": {
      color: theme.palette.secondary.main,
      fontSize: "3rem",
      margin: "0",
    },
    "& h3": {
      color: theme.palette.secondary.light,
      marginBottom: "0.5rem",
      fontSize: "1.5rem",
      width: "100%",
    },
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gridArea: "form",
    padding: "0",
    color: theme.palette.secondary.dark,
    "& label": {
      color: theme.palette.secondary.light,
    },
    "& .MuiSelect-select": {
      color: theme.palette.secondary.light,
    },
  },
  input: {
    marginTop: "0.8rem",
  },
  submit: {
    marginTop: "1.2rem",
    height: "3rem",
    fontSize: "1.5rem",

    boxSizing: "border-box",
  },
}));

const SignUp: React.FC = () => {
  const classes = useStyles();
  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div id="action" className={classes.container}>
      <div className={classes.section}>
        <div className={classes.signUpGrid}>
          <div className={classes.text}>
            <h3>Tilmeld dig:</h3>
            <h2>{"Title of run goes here"}</h2>
          </div>
          <form className={classes.form} noValidate autoComplete="off">
            <TextField
              variant="outlined"
              id="standard-basic"
              label="Fulde Navn"
              color="secondary"
              fullWidth
            />
            <TextField
              variant="outlined"
              id="standard-basic"
              label="Email"
              color="secondary"
              className={classes.input}
              fullWidth
            />
            <TextField
              variant="outlined"
              id="standard-basic"
              label="Telefon nummer"
              color="secondary"
              className={classes.input}
              fullWidth
            />
            <Select
              labelId="Distance"
              fullWidth
              color="secondary"
              variant="outlined"
              className={classes.input}
              value={21}
            >
              <MenuItem value={21}>21.1 km</MenuItem>
              <MenuItem value={10}>10 km</MenuItem>
            </Select>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="secondary"
              className={classes.submit}
            >
              Tilmeld!
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
