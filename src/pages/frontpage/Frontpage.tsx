import { makeStyles } from "@material-ui/core";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import React, { useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import cameraSvg from "../../assets/icons/camera.svg";
import registerSvg from "../../assets/icons/register.svg";
import shoesSvg from "../../assets/icons/shoes.svg";
import aboutSvg from "../../assets/icons/user.svg";
import frbfSvg from "../../assets/images/FUNRUNBYFLEMMING-original.svg";
import road1 from "../../assets/images/road1.jpg";
import About from "../../components/sections/About";
import RaceSelection from "../../components/sections/RaceSelection";
import { UnstyledLink } from "../../utility/link";
gsap.defaults({
  ease: "expo",
});
ScrollTrigger.defaults({
  toggleActions: "play pause resume reverse",
  scroller: "#root",
});

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
    minHeight: "55rem",
    backgroundColor: "#7d925c",
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
      height: "40vh",
    },
    zIndex: -1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  funRunSVG: {
    height: "80vh",
    [theme.breakpoints.down("sm")]: {
      maxHeight: "40vh",
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
    height: "100vh",
  },
  /** Navigation cards */
  introductionSectionGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr 1fr 1fr",
    gridTemplateRows: "1fr auto auto 1fr auto 1fr",
    margin: "0 1rem",
    maxWidth: "45rem",
    height: "100%",
    gridGap: "1.2rem",
    gridTemplateAreas: [
      '". . . ."',
      '"introText introText introText introText"',
      '". . . ."',
      '"register results pictures about"',
      '". . . ."',
    ].join(""),
  },
  navigationCard: {
    border: 0,
    gridArea: "card",
    borderRadius: "1rem",
    display: "flex",
    flexDirection: "column",
    backgroundColor: "rgb(0,0,0, 10%)",
    padding: "0.5rem",
  },
  introTitle: {
    fontSize: "4rem",
    textAlign: "center",
    width: "100%",
    marginBottom: "0",
  },
  introBody: {
    marginTop: "0.5rem",
    fontSize: "2.6rem",
    textAlign: "center",
    width: "100%",
  },
  introText: { gridArea: "introText" },
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
    // Animate navigation cards
    gsap.fromTo(
      "." + classes.navigationCard,
      { y: 150, opacity: 0 },
      {
        scrollTrigger: {
          trigger: "." + classes.navigationCard,
        },
        y: 0,
        duration: 1.5,
        opacity: 1,
      }
    );
    gsap.fromTo(
      "." + classes.introTitle,
      { opacity: 0, x: 100 },
      {
        scrollTrigger: {
          trigger: "." + classes.introTitle,
        },
        opacity: 1,
        duration: 1.25,
        x: 0,
      }
    );
    gsap.fromTo(
      "." + classes.introBody,
      { opacity: 0, x: -100 },
      {
        scrollTrigger: {
          trigger: "." + classes.introBody,
        },
        opacity: 1,
        duration: 1.25,
        x: 0,
      }
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={classes.container}>
      <div className={classes.landingImage}>
        <img
          alt="Fun Run by Flemming"
          src={frbfSvg}
          className={classes.funRunSVG}
        />
      </div>

      <div className={classes.section}>
        <div className={classes.introductionSection}>
          <div className={classes.introductionSectionGrid}>
            {/* Intro text */}
            <div className={classes.introText}>
              <h1 className={classes.introTitle}>Velkommen til holdet</h1>

              <p className={classes.introBody}>
                Her er det vores passion for at løbe er der bringer os sammen.{" "}
                <br />
                Deltag ved at tilmelde dig herunder
              </p>
            </div>

            {/* Navigation Cards */}
            <UnstyledLink
              to={`/select/signup/#raceselection`}
              className={`${classes.navigationCard} ${classes.cardRegister}`}
              // onClick={() =>
              //   document?.getElementById("raceselection")?.scrollIntoView()
              // }
            >
              <img
                alt="Tilmeld dig"
                className={classes.icon}
                src={registerSvg}
              />
              <div className={classes.navigationCardtext}>Tilmeld Dig</div>
            </UnstyledLink>
            <UnstyledLink
              className={`${classes.navigationCard} ${classes.cardResults}`}
              to={`/select/results/#raceselection`}
            >
              <img alt="Resultater" className={classes.icon} src={shoesSvg} />
              <div className={classes.navigationCardtext}>Resultater</div>
            </UnstyledLink>
            <UnstyledLink
              to={`/select/pictures/#raceselection`}
              className={`${classes.navigationCard} ${classes.cardPictures}`}
            >
              <img alt="Billeder" className={classes.icon} src={cameraSvg} />
              <div className={classes.navigationCardtext}>Billeder</div>
            </UnstyledLink>
            <UnstyledLink
              to={`/about/#about`}
              className={`${classes.navigationCard} ${classes.cardAbout}`}
            >
              <img alt="Om Mig" className={classes.icon} src={aboutSvg} />
              <div className={classes.navigationCardtext}>Om Mig</div>
            </UnstyledLink>
          </div>
        </div>
      </div>

      <Switch>
        <Route path={`/select/:dest`} component={RaceSelection} />
        <Route path={`/about`} component={About} />
      </Switch>
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
