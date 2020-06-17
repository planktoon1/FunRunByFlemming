import { makeStyles } from "@material-ui/core";
import Flickity from "flickity";
import React, { useEffect, useRef, useState } from "react";
import cloneDeep from "lodash.clonedeep";
import PlaceOutlinedIcon from "@material-ui/icons/PlaceOutlined";
import EventOutlinedIcon from "@material-ui/icons/EventOutlined";
import DirectionsRunOutlinedIcon from "@material-ui/icons/DirectionsRunOutlined";
import KeyboardArrowDownOutlinedIcon from "@material-ui/icons/KeyboardArrowDownOutlined";
import ArrowBackIosOutlinedIcon from "@material-ui/icons/ArrowBackIosOutlined";
import ArrowForwardIosOutlinedIcon from "@material-ui/icons/ArrowForwardIosOutlined";
import { UnstyledLink } from "../../utility/link";

const useStyles = makeStyles((theme) => ({
  /** Component Container */
  container: {
    overflowX: "hidden",
    height: "100vh",
    minHeight: "45rem",
    scrollSnapAlign: "start",
    backgroundColor: "#fcf8e8",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  gallery: {
    width: "35rem",
    height: "40rem",
    marginBottom: "4rem",
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
      backgroundColor: "grey",
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
  yearSelector: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: "2rem",

    "& *": {
      margin: "1rem",
    },
    "& .year": {
      fontSize: "3rem",
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

const mockRaceObject = {
  "2020": [
    {
      title: "Big Day Race",
      date: "2020-06-17T16:25:42.168Z",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex odio sed incidunt expedita explicabo a provident repellat illo nemo, ea totam natus eius nulla cumque, obcaecati consequatur consectetur? Placeat, nemo?",
      place: "Platanale 46, Horsens",
      distance: "21.1 km",
    },
    {
      title: "Super Fun Run",
      date: "2020-10-17T16:25:42.168Z",
      description:
        "Lorem ipsum dolor sit amet consectetur a provident repellat illo nemo, ea totam natus eius nulla cumque, obcaecati consequatur consectetur? Placeat, nemo?",
      place: "Platanale 46, Horsens",
      distance: "21.1 km",
    },
    {
      title: "Last Day of the Year",
      date: "2020-12-31T16:25:42.168Z",
      description:
        "Ex odio sed incidunt expedita explicabo a provident repellat illo nemo, ea totam natus eius nulla cumque, obcaecati consequatur consectetur? Placeat, nemo?  incidunt expedita explicabo a provident repellat illo nemo, ea totam natus eius nulla cumque, obcaecati consequatur consectetur?",
      place: "Platanale 46, Horsens",
      distance: "21.1 km",
    },
  ],
  "2021": [
    {
      title: "Monster Hard",
      date: "2021-06-06T16:25:42.168Z",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex odio sed incidunt expedita explicabo a provident repellat illo nemo, ea totam natus eius nulla cumque, obcaecati consequatur consectetur? Placeat, nemo?",
      place: "Platanale 46, Horsens",
      distance: "21.1 km",
    },
  ],
};

const RaceSelection: React.FC = () => {
  const classes = useStyles();
  const years = Object.keys(mockRaceObject);
  const [races, setRaces] = useState(mockRaceObject[years[0]]);
  const [selectedYearIndex, setSelectedYearIndex] = useState(0);

  const flkty = useRef<Flickity>();
  useEffect(() => {
    flkty.current = new Flickity(`.${classes.gallery}`, {
      cellAlign: "left",
      contain: true,
      prevNextButtons: false,
      pageDots: false,
    });
  }, [classes.gallery, races]);

  const changeYearBy = (n: number) => {
    const selectedYear = years[selectedYearIndex + n];
    if (selectedYear) {
      setSelectedYearIndex(selectedYearIndex + n);
      const newRaces = cloneDeep(mockRaceObject[selectedYear]);
      flkty.current?.destroy();
      setRaces(newRaces);
    }
  };

  const raceElements = races.map((race) => (
    <div key={race.date} className={classes.raceCard}>
      <h2>{race.title}</h2>
      <p className="detail">
        <PlaceOutlinedIcon /> {race.place}
      </p>
      <p className="detail">
        <EventOutlinedIcon /> {formatDate(new Date(race.date))}
      </p>
      <p className="detail">
        <DirectionsRunOutlinedIcon /> {race.distance}
      </p>
      <p className="description">{race.description}</p>
      <UnstyledLink to={`/results`} className="selectRace">
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

  return (
    <div className={classes.container}>
      {/* Year selector */}
      <div className={classes.yearSelector}>
        <button onClick={() => changeYearBy(-1)}>
          <ArrowBackIosOutlinedIcon
            style={{
              width: "2rem",
              height: "2rem",
            }}
          />
        </button>

        <h2 className="year">{years[selectedYearIndex]}</h2>

        <button onClick={() => changeYearBy(1)}>
          <ArrowForwardIosOutlinedIcon
            style={{
              width: "2rem",
              height: "2rem",
            }}
          />
        </button>
      </div>

      {/* Race selection */}
      <div
        className={`${classes.gallery}`}
        data-flickity-options='{ "cellAlign": "left", "contain": true }'
      >
        {raceElements}
      </div>
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
