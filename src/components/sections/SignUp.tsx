import {
  makeStyles,
  TextField,
  Select,
  MenuItem,
  Button,
} from "@material-ui/core";
import React, { useEffect, useContext, useState } from "react";
import { GlobalContext } from "../../contexts/globalContext";
import { useParams } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  /** Component Container */
  container: {},
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
  signUpGrid: {
    display: "grid",
    gridTemplateColumns: "1fr auto auto 1fr",
    gridTemplateRows: "0.5fr auto auto 1fr",
    margin: "0 1rem",
    maxWidth: "45rem",
    height: "100vh",
    gridGap: "1.2rem",
    gridTemplateAreas: [
      '". . . ."',
      '". text text ."',
      '". form form ."',
      '". . . ."',
    ].join(""),
  },
  text: {
    gridArea: "text",
    "& h2": {
      color: theme.palette.secondary.main,
      fontSize: "3rem",
      margin: "0",
      width: "30rem",
    },
    "& h3": {
      color: theme.palette.secondary.light,
      marginBottom: "0.5rem",
      fontSize: "1.5rem",
      width: "100%",
    },
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gridArea: "form",
    padding: "0",
    color: theme.palette.secondary.dark,
    "& label": {
      color: theme.palette.secondary.light,
    },
    "& .MuiSelect-select": {
      color: theme.palette.secondary.light,
    },
  },
  input: {
    marginTop: "0.8rem",
  },
  submit: {
    marginTop: "1.2rem",
    height: "3rem",
    fontSize: "1.5rem",

    boxSizing: "border-box",
  },
}));

const SignUp: React.FC = () => {
  const classes = useStyles();
  const ctx = useContext(GlobalContext);
  const [distance, setDistance] = useState<string>("");
  let { raceid } = useParams();
  useEffect(() => {
    // If url contains race parameter load race from that
    console.log(raceid);
    if (raceid) {
      const raceTitle = raceid.split(":")[1];
      const choosenRace = ctx.allRaces.find((race) => race.title === raceTitle);
      if (choosenRace) {
        ctx.setSelectedRace(choosenRace);
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    setDistance(ctx.selectedRace.distances[0]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ctx.selectedRace]);

  const handleDistanceChange = (e) => {
    setDistance(e.target.value);
  };

  return (
    <div id="action" className={classes.container}>
      <div className={classes.section}>
        <div className={classes.signUpGrid}>
          <div className={classes.text}>
            <h3>Tilmeld dig:</h3>
            <h2>{ctx.selectedRace.title}</h2>
          </div>
          <form className={classes.form} noValidate autoComplete="off">
            <TextField
              variant="outlined"
              id="standard-basic"
              label="Fulde Navn"
              color="secondary"
              fullWidth
            />
            <TextField
              variant="outlined"
              id="standard-basic"
              label="Email"
              color="secondary"
              className={classes.input}
              fullWidth
            />
            <TextField
              variant="outlined"
              id="standard-basic"
              label="Telefon nummer"
              color="secondary"
              className={classes.input}
              fullWidth
            />

            <Select
              labelId="Distance"
              fullWidth
              color="secondary"
              variant="outlined"
              className={classes.input}
              value={distance}
              onChange={handleDistanceChange}
            >
              {ctx.selectedRace.distances.map((dis) => (
                <MenuItem key={dis} value={dis}>
                  {dis}
                </MenuItem>
              ))}
            </Select>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="secondary"
              className={classes.submit}
            >
              Tilmeld!
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
