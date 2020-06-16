import { makeStyles } from "@material-ui/core";
import React, { useEffect } from "react";

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
    width: "30rem",
  },
  gallery: {
    background: "#EEE",
  },
  galleryCell: {
    width: "100%",
    height: "200px",
    marginRight: "10px",
    background: "#8C8",
    counterIncrement: "gallery-cell",
  },
  /*  END Navigation cards */
}));

const RaceSelection: React.FC = () => {
  const classes = useStyles();
  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={classes.container}>
      <div
        className={`${classes.gallery} js-flickity`}
        data-flickity-options='{ "cellAlign": "left", "contain": true }'
      >
        <div className={classes.galleryCell}>...</div>
        <div className={classes.galleryCell}>...</div>
        <div className={classes.galleryCell}>...</div>
      </div>
    </div>
  );
};

export default RaceSelection;
