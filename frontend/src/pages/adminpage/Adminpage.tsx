import {
  AppBar,
  Button,
  IconButton,
  makeStyles,
  Toolbar,
  Typography,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import React, { useContext } from "react";
import { Route, Switch, useHistory } from "react-router-dom";
import Dashboard from "../../components/adminpage/Dashboard";
import Login from "../../components/adminpage/Login";
import { AuthContext } from "../../contexts/AuthContext";
import PrivateRoute from "./PrivateRoute";

const useStyles = makeStyles((theme) => ({
  /** Component Container */
  container: {
    minHeight: "100vh",
  },
  section: {
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
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

const Adminpage: React.FC = () => {
  const { logout } = useContext(AuthContext);
  const classes = useStyles();
  const history = useHistory();

  const onLogOut = async () => {
    await logout();
    history.push(`/admin/login`);
  };

  return (
    <div className={classes.container}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
            onClick={() => {
              history.push(`/admin`);
            }}
          >
            <MenuIcon></MenuIcon>
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Fun Run By Flemming - Administrator
          </Typography>
          <Button color="inherit" onClick={onLogOut}>
            Log ud
          </Button>
        </Toolbar>
      </AppBar>
      <div className={classes.section}>
        <Switch>
          <Route path={`/admin/login`} component={Login} />
          <PrivateRoute path="/" component={Dashboard} />
        </Switch>
      </div>
    </div>
  );
};

export default Adminpage;
