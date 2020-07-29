import { Button, makeStyles, TextField } from "@material-ui/core";
import React, { useContext, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  section: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
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

const Login: React.FC = () => {
  const { authenticate } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();
  const classes = useStyles();

  const onSubmit = (e) => {
    e.preventDefault();
    authenticate(email, password)
      .then((d) => {
        console.log(d);
        history.push(`/admin`);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <div className={classes.section}>
      <form
        className={classes.form}
        noValidate
        autoComplete="off"
        onSubmit={onSubmit}
      >
        <TextField
          variant="outlined"
          id="standard-basic"
          label="Email"
          color="secondary"
          className={classes.input}
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          fullWidth
        />
        <TextField
          variant="outlined"
          id="standard-basic"
          label="Kode"
          color="secondary"
          className={classes.input}
          value={password}
          type="password"
          onChange={(event) => setPassword(event.target.value)}
          fullWidth
        />

        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="secondary"
          className={classes.submit}
        >
          Log på
        </Button>
      </form>
    </div>
  );
};

export default Login;
