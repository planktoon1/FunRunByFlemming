import { makeStyles } from "@material-ui/core";
import React from "react";

const useStyles = makeStyles((theme) => ({
  section: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
}));

const Dashboard: React.FC = () => {
  const classes = useStyles();

  return <div className={classes.section}>DASHBOARD DASHBOARD DASHBOARD</div>;
};

export default Dashboard;
