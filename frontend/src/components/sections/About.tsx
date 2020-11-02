import { makeStyles } from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar/Avatar";
import React, { useEffect } from "react";
import avatar2 from "../../assets/images/avatar2.png";
import runsammen from "../../assets/images/runsammen.jpg";

const useStyles = makeStyles((theme) => ({
 /** Component Container */
 container: {
  margin: "0 1rem 3.5rem 1rem",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center"
},
section: {
  maxWidth: "55rem",
  minHeight: "100vh",
  width: "100%",
  scrollSnapAlign: "start",
  backgroundColor: "white",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "1rem",
  fontFamily: ["'Titillium Web', sans-serif"].join("'"),
},
aboutMeGrid: {
  display: "grid",
  gridTemplateColumns: "1fr 1fr 1fr",
  gridTemplateRows: "1fr auto auto auto auto auto auto",
  maxWidth: "45rem",
  height: "100%",
  gridGap: "1.2rem",
  gridTemplateAreas: [
    '". . ."',
    '"intro intro intro"',
    '"sdrOmme sdrOmme sdrOmme"',
    '"runners runners runners"',
    '"motionløb motionløb motionløb"',
    '". . ."',
  ].join(""),
},
intro: { gridArea: "intro"},
avatar: { 
  width: "15rem", 
  height: "15rem",
  float: "right",
  shapeOutside: "circle()",
  margin: "0rem 1rem 1rem 0",
  borderRadius: "50%",
  opacity:"1"
},
avatar2: { 
  width: "11rem", 
  height: "11rem",
  float: "left",
  shapeOutside: "circle()",
  margin: "0.5rem 0.6rem 1rem 0",
  borderRadius: "50%",
  opacity:"1"
},
sdrOmme: { gridArea: "sdrOmme" },
runners: { gridArea: "runners" },
motionløb: { gridArea: "motionløb" },
}));

const About: React.FC = () => {
  const classes = useStyles();
  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div id="about" className={classes.container}>
    <div className={classes.section}>
      <div className={`${classes.aboutMeGrid}`}>
      
      <div className={`${classes.intro}`}>
        <Avatar alt="Flemming of picture" src={avatar2} className={`${classes.avatar}`}/>
        <h1 style={{ marginTop: "0"}}>Hej<br/> Jeg er Flemming</h1>
        <p>Jeg er født i 1966 - så må du selv lige regne på alderen, den trykker ikke ;o)</p>
        <p>Jeg er løber - motionsløber. Jeg bliver aldrig hurtig, men jeg kan løbe både kort og langt. Jeg løber glad, både for mig selv og i socialt selskab med andre løber. Løb og fællesskab motiverer og inspirerer mig.</p>
        <p>Mit løbeliv startede i 2013 - fra absolut intet. Første "løb" var på en gåtur, hvor tanken  "Hvor langt kan jeg egentlig løbe" slog ned i mig ={'>'} 300m var svaret, inden ben og åndedræt påstod jeg var tæt på noget grueligt grimt.</p>
        <p>Men begyndte at flette små løbepas på mine gåture - med tiden blev der mere løb end gang.</p>
        <p>Løb mit første officielle 5 km løb i 2014.</p>
      </div>
      <div className={`${classes.sdrOmme}`}>
        <h3>TEAM Sdr. Omme IF</h3>
        <p>I 2017 boede jeg 6 måneder på Omme Å Camping plads - og meldte mig ind i Sønder Omme IF´s Løbeklub. Blev fanget af fællesskabet og løb, gang, hygge og sjov - en god blanding af seriøs træning efter rekorder og medaljer og løb for "sjov" og hygge. Alt krydret  med sammenhold.</p>  
        <p>Løb mit første officielle 10 km som afslutning af sæsonen. </p>
        <p>TEAM Sdr Omme IF er stadig "min" klub selv om jeg er tilbage i Horsens.</p>
      </div>
      <div className={`${classes.runners}`}>
        <h3>Runners.dk - Horsens / Crazy Runners & Walkers Horsens</h3>
        <p>Idag er jeg aktiv i løbefællesskaberne Runners.dk - Horsens & Crazy Runners Horsens</p>
        <p>Løbefællesskaber hvor omdrejnings punktet mere er socialt samvær. Alle ud - alle hjem. Her er plads til alle, speed runners, slow runners. Trail løbere og asfalt fræsere.</p>
        <p>Ture med tempo, og ture i slow. Sociale ture hvor der er opsamling eller de hurtige løber tilbage og henter de knap så hurtige - og ikke mindst tid til både før og efter hygge.</p>
        <p>Jeg er aktiv tur planlægger. Elsker at designe ruter, vise dem frem og frem for alt løbe dem både for mig selv men også i fællesskab.</p>
        <p>Mine ture dækker løberuter på alt mellem 3-4 km og 30 km samt interval træning på den lokale 400m løbebane.</p>
        <p>Løb mit første officielle halvmaraton 16/6 2019</p>
        <p>Løb mit første officielle maraton 19/01 2020</p>
      </div>
      <div className={`${classes.motionløb}`}>
        <h3>Arrangør af officielle motionsløb.</h3>
        <Avatar alt="Flemming of picture" src={runsammen} className={`${classes.avatar2}`}/>
        <p>Maj 2020 - Et opslag på FB, delt af en løbe veninde, "Medalje søger løber" kik startede ide´en om selv at arrangerer et officielt løb. Bestseller Aarhus City Halvmaraton var pga. Covid19 udskudt og de havde et "lager" af medaljer der var trykt med dato for deres nu udskudte løb. Medaljerne var "gratis" med vi kan jo ikke bare ifører os en medalje uden at løbe et løb. Inden en time havde jeg oprettet en begivenhed "Torsted BACH Halvmaraton eller 11 km Run with me" erstatningsløb. </p>
        <p>Da flere af de interesserede løber efter at komme i Klub100 Halvmaraton - tænkte jeg - hvorfor ikke gøre det til et officielt løb. Som tanke så handling. </p>
        <p style={{fontSize: "1.2rem", textAlign: "center"}}><b style={{color: "#506431"}}>FunRunByFlemming</b> var hermed født.</p>
      </div>
      </div>
      </div>
    </div>
  );
};

export default About;
