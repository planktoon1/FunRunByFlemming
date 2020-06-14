import { makeStyles } from "@material-ui/core";
import React, { useEffect } from "react";
import cameraSvg from "../../assets/icons/camera.svg";
import registerSvg from "../../assets/icons/register.svg";
import shoesSvg from "../../assets/icons/shoes.svg";
import aboutSvg from "../../assets/icons/user.svg";
import frbfSvg from "../../assets/images/FUNRUNBYFLEMMING-original.svg";
import road1 from "../../assets/images/road1.jpg";
import { gsap, TweenLite } from "gsap";

const useStyles = makeStyles((theme) => ({
  container: {
    scrollSnapType: "y proximity",
    overflowY: "scroll",
    maxHeight: "100vh",
  },
  section: {
    height: "100vh",
    scrollSnapAlign: "start",
  },
  media: {
    height: "20rem",
    width: "20rem",
  },
  landingImage: {
    scrollSnapAlign: "start",
    backgroundImage: `url(${road1})`,
    background: "no-repeat",
    backgroundPosition: "50% 50%",
    backgroundSize: "cover",
    width: "100%",
    height: "100vh",
    [theme.breakpoints.down("sm")]: {
      height: "20rem",
    },
    zIndex: -1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  funRunSVG: {
    height: "80vh",
    [theme.breakpoints.down("sm")]: {
      maxHeight: "17rem",
    },
    overflow: "hidden",
    objectFit: "contain",
    padding: "0 3rem",
  },
  iconContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",

    height: "100%",
  },
  icon: {
    margin: "auto",
    width: "8rem",
  },
  navigation: {
    borderRadius: "1rem",
    display: "flex",
    flexDirection: "column",
    height: "12rem",
    width: "10rem",
    backgroundColor: "rgb(0,0,0, 10%)",
    padding: "0.1rem",
    margin: "2.5rem",
  },
  text: {
    fontFamily: "'Arial Black', Gadget, sans-serif",
    color: "black",
    fontSize: "1.2rem",
    textAlign: "center",
    marginBottom: "1rem",
  },
}));

const Frontpage: React.FC = () => {
  const classes = useStyles();
  useEffect(() => {
    TweenLite.to("." + classes.navigation, 2, { x: 500, y: 100 });
  }, []);

  return (
    <div className={classes.container}>
      <div className={classes.landingImage}>
        <img src={frbfSvg} className={classes.funRunSVG} />
      </div>

      <div className={classes.section}>
        <div className={classes.iconContainer}>
          <div className={classes.navigation}>
            <img className={classes.icon} src={cameraSvg} />
            <div className={classes.text}>Billeder</div>
          </div>
          <div className={classes.navigation}>
            <img className={classes.icon} src={registerSvg} />
            <div className={classes.text}>Tilmeld Dig</div>
          </div>
          <div className={classes.navigation}>
            <img className={classes.icon} src={shoesSvg} />
            <div className={classes.text}>Resultater</div>
          </div>
          <div className={classes.navigation}>
            <img className={classes.icon} src={aboutSvg} />
            <div className={classes.text}>Om Mig</div>
          </div>
        </div>
      </div>
    </div>
  );
};

interface TabPanelProps {
  children?: React.ReactNode;
  dir?: string;
  index: any;
  value: any;
}

export default Frontpage;
