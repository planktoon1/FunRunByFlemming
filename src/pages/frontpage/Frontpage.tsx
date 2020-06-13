import {
  AppBar,
  CardMedia,
  makeStyles,
  Tab,
  Tabs,
  Typography,
} from "@material-ui/core";
import Box from "@material-ui/core/Box";
import Card from "@material-ui/core/Card/Card";
import Container from "@material-ui/core/Container/Container";
import React from "react";
import SwipeableViews from "react-swipeable-views";
import road1 from "../../assets/images/road1.jpg";
import { theme } from "../../utility/theme";

const useStyles = makeStyles((theme) => ({
  media: {
    height: "40vh",
    width: "100vw",
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`,
  },
  tabContainer: {
    display: "flex",
  },
}));

const Frontpage: React.FC = () => {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const handleChangeIndex = (index: number) => {
    setValue(index);
  };

  return (
    <>
      <Box my={2}>
        <Typography
          variant="h3"
          style={{ textAlign: "center" }}
          color="primary"
        >
          Fun Run By Flemming
        </Typography>
        <Typography
          variant="h4"
          style={{
            textAlign: "center",
            color: theme.palette.secondary.light,
          }}
        >
          Motionsløb for sjov
        </Typography>
      </Box>
      <Card>
        <CardMedia className={classes.media} image={road1} />
      </Card>
      <Box my={2}></Box>
      <Container component="main" maxWidth="md">
        <Card className={classes.tabContainer}>
          <Tabs
            orientation="vertical"
            value={value}
            onChange={handleChange}
            aria-label="full width tabs example"
            className={classes.tabs}
          >
            <Tab label="Kommende Løb" />
            <Tab label="Om Mig" />
            <Tab label="Resultater" />
          </Tabs>

          <SwipeableViews
            axis="y"
            index={value}
            onChangeIndex={handleChangeIndex}
          >
            <TabPanel value={value} index={0}>
              Item One
            </TabPanel>
            <TabPanel value={value} index={1}>
              Item Two
            </TabPanel>
            <TabPanel value={value} index={2}>
              Item Three
            </TabPanel>
          </SwipeableViews>
        </Card>
      </Container>
    </>
  );
};

interface TabPanelProps {
  children?: React.ReactNode;
  dir?: string;
  index: any;
  value: any;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

export default Frontpage;
