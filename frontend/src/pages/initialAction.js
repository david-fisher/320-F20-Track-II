import React from "react";
import { makeStyles, withStyles, Typography, Box, Button, Grid } from "@material-ui/core";
import Checkbox from "./components/checkbox";

// const useStyles = makeStyles((theme) => ({
//   root: {
//     backgroundColor: theme.palette.background.paper,
//     color: "#5b7f95"
//   },
// }));

const TextTypography = withStyles({
  root: {
    color: "#373a3c"
  }
})(Typography);

function InitialAction({pages, setPages, activePage, setActivePage}) {
  function goToProjectAssignment(){
    if (!pages.projectAssignment.visited) {
      setPages(prevPages => {
        let copy = {...prevPages};
        copy.projectAssignment.visited = true;
        return copy;
      });
    }
    setActivePage(prevPage => 'projectAssignment')
  }

  function goToGatheredInformation(){
    if(pages.gatheredInformation.completed){
      if (!pages.gatheredInformation.visited) {
        setPages(prevPages => {
          let copy = {...prevPages};
          copy.gatheredInformation.visited = true;
          return copy;
        });
      }
      setActivePage(prevPage => 'gatheredInformation')
    }
  }

  return (
    <div>
      <Grid container direction="row" justify="center" alignItems="center">
        <Box mt = {5}>
          <TextTypography variant="h4" align="center" gutterBottom>
          What should we not automate? 
          </TextTypography>
        </Box>
      </Grid>
      <Grid container direction="row" justify="space-between">
        <Grid item style={{ marginRight: "0rem", marginTop: "-3rem" }}>
          <Button variant="contained" disableElevation onClick={goToProjectAssignment}>Back</Button>
        </Grid>
        <Grid item style={{marginRight: "0rem", marginTop: "-3rem" }}>
          <Button variant="contained" disableElevation color="primary" onClick={goToGatheredInformation} >Next</Button>
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        <Grid item lg={12}>
          <Box m="2rem">
          </Box>
          <TextTypography variant="body1" align="center">
            Should there be some occupations or parts of human life where Artificial Intelligence and the use of robots are prohibited? 
          </TextTypography>
        </Grid>
        <Grid item lg={12}>
          <Checkbox nextPage = {goToGatheredInformation} pages={pages} nextPageName={"gatheredInformation"}/>
          </Grid>
      </Grid>
    </div>
  );
}

export default InitialAction;