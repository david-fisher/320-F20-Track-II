import React from "react";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";
import Grid from "@material-ui/core/grid";
import { Typography, Box } from "@material-ui/core";

function responseOne({pages, setPages, activePage, setActivePage}) {
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
    if (!pages.gatheredInformation.visited) {
      setPages(prevPages => {
        let copy = {...prevPages};
        copy.gatheredInformation.visited = true;
        return copy;
      });
    }
    setActivePage(prevPage => 'gatheredInformation')
  }

  return (
    <div>
      <Grid container direction="row" justify="center" alignItems="center">
        <Typography variant="h4" align="center" gutterBottom>
          the first response
        </Typography>
      </Grid>
      <Grid container direction="row" justify="space-between">
        <Grid item style={{ marginLeft: "2rem", marginBottom: "1rem" }}>
        <Button variant="light" onClick={goToProjectAssignment}>Back</Button>
        </Grid>
        <Grid item style={{ marginRight: "2rem", marginBottom: "1rem" }}>
          <Button variant="primary" onClick={goToGatheredInformation}>Next</Button>
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        <Grid item lg={12}>
          <Box m="2rem">
          </Box>
          <Typography variant="body1" align="center">
            Some Response.
          </Typography>
        </Grid>
      </Grid>
    </div>
  );
}

export default responseOne;