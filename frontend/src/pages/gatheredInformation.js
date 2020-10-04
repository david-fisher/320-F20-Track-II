import React from "react";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";
import Grid from "@material-ui/core/grid";
import { Typography, Box } from "@material-ui/core";

function GatheredInformation({pages, setPages, activePage, setActivePage}) {
  function goToResponseOne(){
    if (!pages.responseOne.visited) {
      setPages(prevPages => {
        let copy = {...prevPages};
        copy.responseOne.visited = true;
        return copy;
      });
    }
    setActivePage(prevPage => 'responseOne')
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
        <Typography variant="h4" align="center" gutterBottom>
          Gathered Information
        </Typography>
      </Grid>
      <Grid container direction="row" justify="space-between">
        <Grid item style={{ marginLeft: "2rem", marginBottom: "1rem" }}>
          <Button variant="light" onClick={goToResponseOne}>Back</Button>
        </Grid>
        <Grid item style={{ marginRight: "2rem", marginBottom: "1rem" }}>
          <Button variant="primary" onClick={goToStakeholders} >Next</Button>
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        <Grid item lg={12}>
          <Box m="2rem">
          </Box>
          <Typography variant="body1" align="center">
          Gathered Information
          </Typography>
        </Grid>
      </Grid>
    </div>
  );
}

export default GatheredInformation;