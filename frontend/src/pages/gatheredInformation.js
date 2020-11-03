import React from "react";
import { withStyles, Typography, Box, Button, Grid } from "@material-ui/core";

const TextTypography = withStyles({
  root: {
    color: "#373a3c"
  }
})(Typography);

function GatheredInformation({pages, setPages, activePage, setActivePage}) {
  let goToInitialAction = ()=>{
    if(pages.initialAction.completed){
      if(!pages.initialAction.visited) {
          setPages(prevPages => {
            let copy = {...prevPages};
            copy.initialAction.visited = true;
            return copy;
          });
        }
        setActivePage(prevPage => 'initialAction')
    }
  }
  function goToStakeholders(){
    if (!pages.stakeholders.visited) {
      setPages(prevPages => {
        let copy = {...prevPages};
        copy.stakeholders.visited = true;
        return copy;
      });
    }
    setActivePage(prevPage => 'stakeholders')
  }

  return (
    <div>
      <Grid container direction="row" justify="center" alignItems="center">
        <Box mt = {5}>
          <TextTypography variant="h4" align="center" gutterBottom>
            Gathered Information
          </TextTypography>
        </Box>
      </Grid>
      <Grid container direction="row" justify="space-between">
        <Grid item style={{ marginRight: "0rem", marginTop: "-3rem" }}>
          <Button aria-label = "go to initial action, back" variant="contained" disableElevation onClick={goToInitialAction}>Back</Button>
        </Grid>
        <Grid item style={{ marginRight: "0rem", marginTop: "-3rem" }}>
          <Button aria-label = "go to stakeholders, next" variant="contained" disableElevation color="primary" onClick={goToStakeholders} >Next</Button>
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        <Grid item lg={12}>
          <Box m="2rem">
          </Box>
          <TextTypography variant="body1" align="center">
          Gathered Information
          </TextTypography>
        </Grid>
      </Grid>
    </div>
  );
}

export default GatheredInformation;