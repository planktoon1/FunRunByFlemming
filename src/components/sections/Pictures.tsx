import { makeStyles } from "@material-ui/core";
import React, { useEffect } from "react";

const useStyles = makeStyles((theme) => ({
  /** Component Container */
  container: {
    // scrollSnapType: "y proximity",
    // // overflowY: "scroll",
    // maxHeight: "100vh",
    height: "100vh",
    backgroundColor: theme.palette.secondary.light,
    scrollSnapAlign: "start",
  },

  /*  END Navigation cards */
}));

const Pictures: React.FC = () => {
  const classes = useStyles();
  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div id="action" className={classes.container}>
      Pictures
    </div>
  );
};

export default Pictures;
