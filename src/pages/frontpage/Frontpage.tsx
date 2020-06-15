import { makeStyles } from "@material-ui/core";
import React, { useEffect } from "react";
import cameraSvg from "../../assets/icons/camera.svg";
import registerSvg from "../../assets/icons/register.svg";
import shoesSvg from "../../assets/icons/shoes.svg";
import aboutSvg from "../../assets/icons/user.svg";
import frbfSvg from "../../assets/images/FUNRUNBYFLEMMING-original.svg";
import road1 from "../../assets/images/road1.jpg";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const useStyles = makeStyles((theme) => ({
  /** Component Container */
  container: {
    // scrollSnapType: "y proximity",
    // // overflowY: "scroll",
    // maxHeight: "100vh",
  },
  section: {
    height: "100vh",
    scrollSnapAlign: "start",
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
  /** *** Introduction Section *** */
  introductionSection: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
  },
  /** Navigation cards */
  introductionSectionGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr 1fr 1fr",
    gridTemplateRows: "1fr 6rem 24rem 1fr 12rem 1fr",
    margin: "0 1rem",
    maxWidth: "45rem",
    maxHeight: "100vh",
    gridGap: "1.2rem",
    gridTemplateAreas: [
      '". . . ."',
      '"title title title title"',
      '"body body body body"',
      '". . . ."',
      '"register results pictures about"',
      '". . . ."',
    ].join(""),
  },
  navigationCard: {
    gridArea: "card",
    borderRadius: "1rem",
    display: "flex",
    flexDirection: "column",
    backgroundColor: "rgb(0,0,0, 10%)",
    padding: "0.5rem",
  },
  introTitle: {
    gridArea: "title",
    fontSize: "4rem",
    textAlign: "center",
    width: "100%",
  },
  introSubTitle: { gridArea: "subTitle" },
  introBody: {
    gridArea: "body",
    fontSize: "2.8rem",
    textAlign: "center",
    width: "100%",
  },
  cardRegister: { gridArea: "register" },
  cardResults: { gridArea: "results" },
  cardPictures: { gridArea: "pictures" },
  cardAbout: { gridArea: "about" },
  icon: {
    margin: "auto",
    width: "8rem",
  },
  navigationCardtext: {
    fontWeight: 700,
    color: "black",
    fontSize: "1.3rem",
    textAlign: "center",
  },
  /*  END Navigation cards */
}));

const Frontpage: React.FC = () => {
  const classes = useStyles();
  useEffect(() => {
    const className = "." + classes.navigationCard;
    const className2 = "." + classes.cardRegister;
    gsap.to(".box", {
      scrollTrigger: ".box", // start the animation when ".box" enters the viewport (once)
      x: 500,
    });
  }, []);

  return (
    <div className={classes.container}>
      <div className={classes.landingImage}>
        <img src={frbfSvg} className={classes.funRunSVG} />
      </div>

      <div className={classes.section}>
        <div className={classes.introductionSection}>
          <div className={classes.introductionSectionGrid}>
            {/* Intro text */}
            <h1 className={classes.introTitle}>Velkommen til holdet</h1>

            <p className={classes.introBody}>
              Her er det vores passion for at løbe er der bringer os sammen.{" "}
              <br />
              Deltag ved at tilmelde dig herunder
            </p>

            {/* Navigation Cards */}

            <div
              className={`${classes.navigationCard} ${classes.cardRegister}`}
            >
              <img className={classes.icon} src={registerSvg} />
              <div className={classes.navigationCardtext}>Tilmeld Dig</div>
            </div>
            <div className={`${classes.navigationCard} ${classes.cardResults}`}>
              <img className={classes.icon} src={shoesSvg} />
              <div className={classes.navigationCardtext}>Resultater</div>
            </div>
            <div
              className={`${classes.navigationCard} ${classes.cardPictures}`}
            >
              <img className={classes.icon} src={cameraSvg} />
              <div className={classes.navigationCardtext}>Billeder</div>
            </div>
            <div className={`${classes.navigationCard} ${classes.cardAbout}`}>
              <img className={classes.icon} src={aboutSvg} />
              <div className={classes.navigationCardtext}>Om Mig</div>
            </div>
          </div>
          <div className="box">HEJ MED DIG</div>
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
