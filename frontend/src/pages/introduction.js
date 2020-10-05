import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { withStyles, Typography, Box, Grid, Button } from "@material-ui/core";

const TextTypography = withStyles({
  root: {
    color: "#373a3c"
  }
})(Typography);

function Introduction({ pages, setPages, activePage, setActivePage }) {
  function goToPrjectAssignment() {
    if (!pages.projectAssignment.visited) {
      setPages(prevPages => {
        let copy = { ...prevPages };
        copy.projectAssignment.visited = true;
        return copy;
      });
    }
    setActivePage(prevPage => 'projectAssignment')
  }

  return (
    <div>
    <Box mt = {5}>
      <Grid container direction="row" justify="center" alignItems="center">
          <TextTypography variant="h4" align="center" gutterBottom>
            Introduction
          </TextTypography>
      </Grid>
      </Box>
      <Grid container direction="row" justify="space-between">
       <Grid item style={{ marginLeft: "0rem", marginRight: "0rem", marginTop: "-3rem" }}>
         {/*  <Button>Back</Button>*/}
        </Grid>
        <Grid item style={{ marginRight: "2rem", marginRight: "0rem", marginTop: "-3rem" }}>
          <Button onClick={goToPrjectAssignment}>Next</Button>
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        <Grid item lg={12}>
          <Box m="2rem">
          </Box>
          <TextTypography variant="body1" align="center">
            Some Introduction.
          </TextTypography>
        </Grid>
      </Grid>
    </div>
  );
}

export default Introduction;