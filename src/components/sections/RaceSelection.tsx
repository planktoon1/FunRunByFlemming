import { makeStyles } from "@material-ui/core";
import React, { useEffect } from "react";
import Flickity from "flickity";

const useStyles = makeStyles((theme) => ({
  /** Component Container */
  container: {
    // scrollSnapType: "y proximity",
    // // overflowY: "scroll",
    // maxHeight: "100vh",
    height: "100vh",
    scrollSnapAlign: "start",
    backgroundColor: "#fcf8e8",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  /** Navigation cards */
  selectionGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr 1fr 1fr",
    gridTemplateRows: "autp",
    margin: "0 1rem",
    maxWidth: "45rem",
    maxHeight: "100vh",
    gridGap: "1.2rem",
    gridTemplateAreas: ['". . . ."', '"title title title title"'].join(""),
  },
  raceCard: {
    borderRadius: "1rem",
    display: "flex",
    flexDirection: "column",
    backgroundColor: "rgb(0,0,0, 10%)",
    padding: "0.5rem",
    width: "40%",
    height: "30rem",
    margin: "1rem",
    counterIncrement: "carousel-cell",
    boxSizing: "border-box",
  },
  "is-selected": {
    backgroundColor: "blue",
  },
  gallery: {
    background: "#EEE",
    width: "100%",
    height: "30rem",
    boxSizing: "border-box",
  },
  /*  END Navigation cards */
}));

const RaceSelection: React.FC = () => {
  const classes = useStyles();
  useEffect(() => {
    // element argument can be a selector string
    //   for an individual element
    var flkty = new Flickity(`.${classes.gallery}`, {
      cellAlign: "left",
      contain: true,
      prevNextButtons: true,
      pageDots: false,
      groupCells: true,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={classes.container}>
      <div
        className={`${classes.gallery}`}
        data-flickity-options='{ "cellAlign": "left", "contain": true }'
      >
        <div className={classes.raceCard}>..HEJ.</div>
        <div className={classes.raceCard}>...</div>
        <div className={classes.raceCard}>...</div>
        <div className={classes.raceCard}>DOT</div>
        <div className={classes.raceCard}>TEST</div>
        <div className={classes.raceCard}>...</div>
      </div>
    </div>
  );
};

export default RaceSelection;
