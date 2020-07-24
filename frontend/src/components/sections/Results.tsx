import { makeStyles, MenuItem, Select } from "@material-ui/core";
import AddBox from "@material-ui/icons/AddBox";
import ArrowDownward from "@material-ui/icons/ArrowDownward";
import Check from "@material-ui/icons/Check";
import ChevronLeft from "@material-ui/icons/ChevronLeft";
import ChevronRight from "@material-ui/icons/ChevronRight";
import Clear from "@material-ui/icons/Clear";
import DeleteOutline from "@material-ui/icons/DeleteOutline";
import Edit from "@material-ui/icons/Edit";
import FilterList from "@material-ui/icons/FilterList";
import FirstPage from "@material-ui/icons/FirstPage";
import LastPage from "@material-ui/icons/LastPage";
import Remove from "@material-ui/icons/Remove";
import SaveAlt from "@material-ui/icons/SaveAlt";
import Search from "@material-ui/icons/Search";
import ViewColumn from "@material-ui/icons/ViewColumn";
import MaterialTable from "material-table";
import React, { forwardRef, useContext, useEffect, useState } from "react";
import { GlobalContext } from "../../contexts/globalContext";

const tableIcons = {
  // @ts-ignore
  Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
  // @ts-ignore
  Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
  // @ts-ignore
  Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  // @ts-ignore
  Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
  DetailPanel: forwardRef((props, ref) => (
    // @ts-ignore
    <ChevronRight {...props} ref={ref} />
  )),
  // @ts-ignore
  Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
  // @ts-ignore
  Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
  // @ts-ignore
  Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
  // @ts-ignore
  FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
  // @ts-ignore
  LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
  // @ts-ignore
  NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  PreviousPage: forwardRef((props, ref) => (
    // @ts-ignore
    <ChevronLeft {...props} ref={ref} />
  )),
  // @ts-ignore
  ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  // @ts-ignore
  Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
  // @ts-ignore
  SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
  // @ts-ignore
  ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
  // @ts-ignore
  ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />),
};

const useStyles = makeStyles((theme) => ({
  /** Component Container */
  container: {
    margin: " 0 1rem",
  },
  section: {
    minHeight: "100vh",
    width: "100%",
    scrollSnapAlign: "start",
    backgroundColor: "white",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  resultsGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr 1fr 1fr",
    gridTemplateRows: "0.5fr auto auto 1fr",
    minHeight: "95vh",
    width: "100%",
    maxWidth: "60rem",
    margin: "0 1rem",
    gridGap: "1.2rem",
    gridTemplateAreas: [
      '". . . ."',
      '"text text text distanceSelector"',
      '"results results results results"',
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
  results: {
    display: "flex",
    flexDirection: "column",
    gridArea: "results",
    padding: "0",
    width: "100%",
  },
  distances: {
    width: "100%",
    display: "flex",
    marginTop: "auto",
    justifyContent: "space-between",
    gridArea: "distanceSelector",
    "& .distanceSelect": {
      fontSize: "1.5rem",
      marginBottom: "0.5rem",
    },
  },
}));

const Results: React.FC = () => {
  const classes = useStyles();
  const ctx = useContext(GlobalContext);
  const [distances, setDistances] = useState<string[]>([]);
  const [distance, setDistance] = useState<string>("");
  const [resultData, setResultData] = useState<
    { contestantName: string; contestantTime: string }[]
  >([]);

  useEffect(() => {
    if (ctx.selectedRace) {
      setDistance(ctx.selectedRace.distances[0]);
      setResults(ctx.selectedRace.distances[0]);
      setDistances(Object.keys(ctx.selectedRace.results));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ctx.selectedRace]);

  const handleDistanceChange = (e) => {
    setDistance(e.target.value);
    setResults(e.target.value);
  };

  const setResults = (distance: string) => {
    const currentResultdata = ctx.selectedRace?.results[distance];
    if (currentResultdata) {
      setResultData(currentResultdata);
    } else {
      setResultData([]);
      //TODO: Snackbar warning no results..
    }
  };

  return (
    <div id="action" className={classes.container}>
      <div className={classes.section}>
        <div className={classes.resultsGrid}>
          <div className={classes.text}>
            <h3>Resultater for:</h3>
            <h2>
              {(ctx.selectedRace && ctx.selectedRace.title) ||
                "Vælg et løb oven over"}
            </h2>
          </div>
          <div className={classes.distances}>
            <Select
              labelId="Distance"
              fullWidth
              color="secondary"
              variant="standard"
              className="distanceSelect"
              value={distance}
              onChange={handleDistanceChange}
            >
              {distances.map((dis) => (
                <MenuItem key={dis} value={dis}>
                  {dis}
                </MenuItem>
              ))}
            </Select>
          </div>
          <div className={classes.results}>
            <MaterialTable
              // @ts-ignore
              icons={tableIcons}
              columns={[
                { title: "Navn", field: "contestantName" },
                { title: "Tid", field: "contestantTime" },
              ]}
              data={resultData}
              title=""
              options={{ pageSize: 7, pageSizeOptions: [7] }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Results;
