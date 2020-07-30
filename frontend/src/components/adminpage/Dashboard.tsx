import {
  makeStyles,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@material-ui/core";
import React, { useState, useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  section: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    margin: "1rem",
  },
}));

const Dashboard: React.FC = () => {
  const classes = useStyles();
  const history = useHistory();
  const { authFetch } = useContext(AuthContext);
  const [open, setOpen] = useState<boolean>(false);

  const onPublish = async () => {
    console.log("do stuff");
    try {
      const res = await authFetch(
        "https://r69zf4k5cc.execute-api.eu-central-1.amazonaws.com/dev/admin/api/test"
      );

      console.log(res);
    } catch (error) {
      console.error(error);
    }
    handleClose();
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className={classes.section}>
      <Button
        fullWidth
        variant="contained"
        color="secondary"
        onClick={() =>
          window.open(
            "https://docs.google.com/spreadsheets/d/1k1mSFrLWWHPAOt0rB0mU-V--ztfp15_RzhI99ywh6EY",
            "_blank"
          )
        }
        className={classes.button}
      >
        Opdater løb(Åbn Sheets)
      </Button>
      <Button
        fullWidth
        variant="contained"
        color="secondary"
        onClick={() => {
          history.push(`/`);
        }}
        className={classes.button}
      >
        Se forhåndsvisning
      </Button>
      <Button
        fullWidth
        variant="contained"
        color="secondary"
        onClick={handleClickOpen}
        className={classes.button}
      >
        Offentliggør Ændringer
      </Button>

      {/* VVVVV Pop Up Dialog VVVVV */}
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Offentliggør Ændringer?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Vil du offentliggøre ændringer til den offentlige hjemmeside. Dette
            betyder at alle ændringer lavet til dataen vil overskrive den data
            der er tilgængelige på hjemmesiden.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Annuller
          </Button>
          <Button onClick={onPublish} color="secondary" autoFocus>
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Dashboard;
