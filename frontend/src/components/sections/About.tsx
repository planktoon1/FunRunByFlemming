import { makeStyles } from "@material-ui/core";
import React, { useEffect } from "react";

const useStyles = makeStyles((theme) => ({
  /** Component Container */
  container: {
    minHeight: "30rem",
  },

  /*  END Navigation cards */
}));

const About: React.FC = () => {
  const classes = useStyles();
  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div id="about" className={classes.container}>
      About
    </div>
  );
};

export default About;
