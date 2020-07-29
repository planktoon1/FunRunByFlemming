import { Button, makeStyles } from "@material-ui/core";
import React, { useContext } from "react";
import { Route, Switch, useHistory } from "react-router-dom";
import Dashboard from "../../components/adminpage/Dashboard";
import Login from "../../components/adminpage/Login";
import { AuthContext } from "../../contexts/AuthContext";
import PrivateRoute from "./PrivateRoute";

const useStyles = makeStyles((theme) => ({
  /** Component Container */
  container: {},
  section: {
    height: "100vh",
    minHeight: "45rem",
    scrollSnapAlign: "start",
    backgroundColor: "white",
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

const Adminpage: React.FC = () => {
  const { logout, authFetch } = useContext(AuthContext);
  const classes = useStyles();
  const history = useHistory();

  const onCheckSes = async () => {
    try {
      const res = await authFetch(
        "https://r69zf4k5cc.execute-api.eu-central-1.amazonaws.com/dev/admin/api/test"
      );

      console.log(res);

      // const session = getSession();
      // console.log(session);
    } catch (error) {
      console.error(error);
    }
  };
  const onLogOut = async () => {
    await logout();
    history.push(`/admin/login`);
  };

  return (
    <div className={classes.container}>
      <div className={classes.section}>
        <Switch>
          <Route path={`/admin/login`} component={Login} />
          <PrivateRoute path="/" component={Dashboard} />
        </Switch>
        <Button
          fullWidth
          variant="contained"
          color="secondary"
          onClick={onCheckSes}
          className={classes.submit}
        >
          check sess
        </Button>
        <Button
          fullWidth
          variant="contained"
          color="secondary"
          onClick={onLogOut}
          className={classes.submit}
        >
          logout
        </Button>
      </div>
    </div>
  );
};

export default Adminpage;
