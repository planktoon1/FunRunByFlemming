import { makeStyles, Button } from "@material-ui/core";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import React, { useEffect, useContext } from "react";
import { Route, Switch, useHistory } from "react-router-dom";
import registerSvg from "../../assets/icons/register.svg";
import shoesSvg from "../../assets/icons/shoes.svg";
import aboutSvg from "../../assets/icons/user.svg";
import frbfSvg from "../../assets/images/FUNRUNBYFLEMMING-original.svg";
import road1 from "../../assets/images/road1.jpg";
import About from "../../components/sections/About";
import RaceSelection from "../../components/sections/RaceSelection";
import { UnstyledLink } from "../../utility/link";
import { GlobalContext, DataMode } from "../../contexts/globalContext";
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
    backgroundColor: "white",
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
    gridTemplateColumns: "1fr 1fr 1fr",
    gridTemplateRows: "1fr auto auto 1fr auto 1fr",
    margin: "0 1rem",
    maxWidth: "45rem",
    height: "100%",
    gridGap: "1.2rem",
    gridTemplateAreas: [
      '". . ."',
      '"introText introText introText"',
      '". . ."',
      '"register results about"',
      '". . ."',
    ].join(""),
  },
  navigationCard: {
    border: `0.2rem dashed ${theme.palette.secondary.light}`,
    gridArea: "card",
    borderRadius: "1rem",
    display: "flex",
    flexDirection: "column",
    // backgroundColor: "rgba(0,0,0, 20%)",
    padding: "0.5rem",
  },
  introTitle: {
    color: theme.palette.secondary.main,
    fontSize: "4rem",
    textAlign: "center",
    width: "100%",
    marginBottom: "0",
  },
  introBody: {
    color: theme.palette.secondary.light,
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
    filter:
      "invert(32%) sepia(45%) saturate(452%) hue-rotate(42deg) brightness(98%) contrast(89%)",
  },
  navigationCardtext: {
    fontWeight: 700,
    color: theme.palette.secondary.light,
    fontSize: "1.3rem",
    textAlign: "center",
  },
  disclaimerBanner: {
    position: "fixed",
    top: "10px",
    opacity: "0.6",
    left: "0",
    width: "100%",
    backgroundColor: "orange",
    fontSize: "2rem",
    zIndex: 1,
    padding: "0.8rem",
  },
  /*  END Navigation cards */
}));

const Frontpage: React.FC = () => {
  const classes = useStyles();
  const { dataMode } = useContext(GlobalContext);
  const history = useHistory();
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
      {/* {dataMode === DataMode.AdminPreview && (
        <div className={classes.disclaimerBanner}>
          FORHÅNDSVISNING
          <Button
            variant="outlined"
            style={{ float: "right" }}
            onClick={() => {
              history.push(`/admin`);
            }}
          >
            Tilbage til Admin
          </Button>
        </div>
      )} */}

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
                Her er det vores passion for at løbe der bringer os sammen.{" "}
                <br />
                Deltag ved at tilmelde dig herunder
              </p>
            </div>

            {/* Navigation Cards */}
            <UnstyledLink
              to={`/race/signup/#raceselection`}
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
              to={`/race/results/#raceselection`}
            >
              <img alt="Resultater" className={classes.icon} src={shoesSvg} />
              <div className={classes.navigationCardtext}>Resultater</div>
            </UnstyledLink>
            {/* <UnstyledLink
              to={`/race/pictures/#raceselection`}
              className={`${classes.navigationCard} ${classes.cardPictures}`}
            >
              <img alt="Billeder" className={classes.icon} src={cameraSvg} />
              <div className={classes.navigationCardtext}>Billeder</div>
            </UnstyledLink> */}
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
        <Route path={`/race/:dest`} component={RaceSelection} />
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
