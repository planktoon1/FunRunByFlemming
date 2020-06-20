import { makeStyles } from "@material-ui/core";
import ArrowBackIosOutlinedIcon from "@material-ui/icons/ArrowBackIosOutlined";
import ArrowForwardIosOutlinedIcon from "@material-ui/icons/ArrowForwardIosOutlined";
import DirectionsRunOutlinedIcon from "@material-ui/icons/DirectionsRunOutlined";
import EventOutlinedIcon from "@material-ui/icons/EventOutlined";
import KeyboardArrowDownOutlinedIcon from "@material-ui/icons/KeyboardArrowDownOutlined";
import PlaceOutlinedIcon from "@material-ui/icons/PlaceOutlined";
import Flickity from "flickity";
import cloneDeep from "lodash.clonedeep";
import React, { useContext, useEffect, useRef, useState } from "react";
import {
  Route,
  Switch,
  useParams,
  useRouteMatch,
  useHistory,
} from "react-router-dom";
import { GlobalContext } from "../../contexts/globalContext";
import { UnstyledLink } from "../../utility/link";
import { theme } from "../../utility/theme";
import Pictures from "./Pictures";
import Results from "./Results";
import SignUp from "./SignUp";

const useStyles = makeStyles((theme) => ({
  container: {},
  /** Component section */
  section: {
    overflowX: "hidden",
    height: "100vh",
    minHeight: "45rem",
    scrollSnapAlign: "start",
    backgroundColor: "white",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  raceSelectionGrid: {
    display: "grid",
    gridTemplateColumns: "auto auto auto",
    gridTemplateRows: "auto auto 1fr",
    margin: "0 1rem",
    maxWidth: "45rem",
    maxHeight: "100vh",
    height: "100vh",
    gridGap: "1.2rem",
    gridTemplateAreas: ['". yearSelector ."', '". gallery ."', '". . . "'].join(
      ""
    ),
  },
  gallery: {
    gridArea: "gallery",
    width: "35rem",
    height: "40rem",
    "&:focus": {
      outline: "1px dashed #888888",
    },
  },
  raceCard: {
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    borderRadius: "1rem",
    backgroundColor: "rgb(0,0,0, 10%)",
    textAlign: "center",
    width: "35rem",
    height: "40rem",
    marginRight: "1rem",
    transition: "background-color 0.5s",
    zIndex: 1,
    "&.is-selected": {
      backgroundColor: "#7d925c",
      zIndex: 10,
    },
    "& h2": {
      fontSize: "3.2rem",
      marginBottom: "0",
    },
    "& .detail": {
      display: "flex",
      alignItems: "center",
      fontSize: "1.3rem",
      margin: "0",
      marginBottom: "0.2rem",
      lineHeight: "1.6",
      "& svg": {
        color: "rgb(0,0,0, 60%)",
        marginRight: "0.4rem",
      },
      "& .text": {
        height: "2rem",
      },
    },
    "& .description": {
      fontSize: "1.5rem",
      margin: "1.5rem",
    },
    "& .selectRace": {
      backgroundColor: "Transparent",
      backgroundRepeat: "no-repeat",
      width: "100%",
      position: "absolute",
      bottom: "1rem",
      border: "none",
      cursor: "pointer",
      overflow: "hidden",
      outline: "none",
      "&:focus": {
        outline: "2px dashed rgb(0,0,0, 60%)",
      },
    },
  },
  nextRace: {
    gridArea: "nextRace",
    height: "40rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "10rem",
    zIndex: 5,
  },
  previousRace: {
    gridArea: "previousRace",
    height: "40rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "10rem",
    zIndex: 5,
  },
  yearSelector: {
    display: "flex",
    gridArea: "yearSelector",
    alignItems: "center",
    justifyContent: "center",
    margin: "2rem",

    "& *": {
      margin: "1rem",
    },
    "& .year": {
      fontSize: "3rem",
      color: theme.palette.secondary.main,
    },
    "& button": {
      fontSize: "3rem",
      backgroundColor: "Transparent",
      backgroundRepeat: "no-repeat",
      border: "none",
      cursor: "pointer",
      overflow: "hidden",
      outline: "none",
      "&:focus": {
        outline: "1px dashed #888888",
      },
    },
  },
}));

const RaceSelection: React.FC = () => {
  const classes = useStyles();
  const ctx = useContext(GlobalContext);
  const years = Object.keys(ctx.racesByYear);
  const [races, setRaces] = useState<any[]>(ctx.racesByYear[years[0]]);
  const [selectedYearIndex, setSelectedYearIndex] = useState(0);
  const [selectedRace, setSelectedRace] = useState(
    encodeURI(ctx.selectedRace.title)
  );
  const history = useHistory();
  const { url, path } = useRouteMatch();
  let { dest } = useParams();

  const flkty = useRef<Flickity>();
  useEffect(() => {
    const galery = document.querySelector(`.${classes.gallery}`);
    flkty.current = new Flickity(galery!, {
      cellAlign: "left",
      contain: true,
      prevNextButtons: false,
      pageDots: false,
    });
    flkty.current.on("staticClick", function (
      event,
      pointer,
      cellElement,
      cellIndex
    ) {
      if (cellIndex === undefined) {
        return;
      }
      flkty.current?.selectCell(cellIndex);
    });
    flkty.current.on("settle", function (cellIndex) {
      const raceToBe = races[Number(cellIndex)];
      ctx.setSelectedRace(raceToBe);
      setSelectedRace(encodeURI(raceToBe.title));
      //history.push(`/race/${dest}/:${encodeURI(raceToBe.title)}`);
    });
    // If possible select second index to make the page look better ;)
    flkty.current.selectCell(1);
    // ctx.setSelectedRace(races[flkty.current.selectedIndex]);
    const raceTitleUri = encodeURI(races[flkty.current.selectedIndex].title);
    setSelectedRace(raceTitleUri);
    //history.push(`/race/${dest}/:${raceTitleUri}`);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [classes.gallery, races]);

  const changeYearBy = (n: number) => {
    const selectedYear = years[selectedYearIndex + n];
    if (selectedYear) {
      setSelectedYearIndex(selectedYearIndex + n);
      const newRaces = cloneDeep(ctx.racesByYear[selectedYear]);
      flkty.current?.destroy();
      setRaces(newRaces);
    }
  };

  const raceElements = races.map((race, i) => (
    <div key={i} className={classes.raceCard}>
      <h2>{race.title}</h2>
      <p className="detail">
        <PlaceOutlinedIcon /> {race.place}
      </p>
      <p className="detail">
        <EventOutlinedIcon /> {formatDate(new Date(race.date))}
      </p>
      <p className="detail">
        <DirectionsRunOutlinedIcon /> {race.distances.join(", ")}
      </p>
      <p className="description">{race.description}</p>
      <UnstyledLink
        to={`/race/${dest}/:${selectedRace}/#action`}
        className="selectRace"
      >
        <KeyboardArrowDownOutlinedIcon
          style={{
            width: "3rem",
            height: "3rem",
            color: "rgb(0,0,0, 60%)",
          }}
        />{" "}
      </UnstyledLink>
    </div>
  ));

  const getActionComponent = () => {
    switch (dest) {
      case "signup":
        return SignUp;
      case "results":
        return Results;
      case "pictures":
        return Pictures;
      default:
        return;
    }
  };

  return (
    <div className={classes.container}>
      <div className={classes.section} id="raceselection">
        <div className={classes.raceSelectionGrid}>
          {/* Year selector */}
          <div className={classes.yearSelector}>
            <button onClick={() => changeYearBy(-1)}>
              <ArrowBackIosOutlinedIcon
                style={{
                  width: "2rem",
                  height: "2rem",
                  fill: years[selectedYearIndex - 1]
                    ? theme.palette.secondary.light
                    : "rgb(0,0,0, 20%)",
                }}
              />
            </button>
            <h2 className="year">{years[selectedYearIndex]}</h2>

            <button onClick={() => changeYearBy(1)}>
              <ArrowForwardIosOutlinedIcon
                style={{
                  width: "2rem",
                  height: "2rem",
                  fill: years[selectedYearIndex + 1]
                    ? theme.palette.secondary.light
                    : "rgb(0,0,0, 20%)",
                }}
              />
            </button>
          </div>

          <div
            className={`${classes.gallery}`}
            data-flickity-options='{ "cellAlign": "left", "contain": true }'
          >
            {raceElements}
          </div>
        </div>
      </div>

      <Switch>
        <Route path={`${url}/:raceid`} component={getActionComponent()} />
      </Switch>
      {/* <SignUp /> */}
    </div>
  );
};
export default RaceSelection;

function formatDate(date: Date): string {
  return (
    date.getFullYear() +
    "-" +
    (date.getMonth() + 1) +
    "-" +
    date.getDate() +
    " " +
    date.getHours() +
    ":" +
    date.getMinutes()
  );
}
