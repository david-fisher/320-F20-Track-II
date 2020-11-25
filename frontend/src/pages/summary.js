import React from "react";
import { withStyles,Typography, Box, Grid, Button } from "@material-ui/core";

const TextTypography = withStyles({
  root: {
    color: "#373a3c"
  }
})(Typography);

function Summary({pages, setPages, activePage, setActivePage}) {
  function goToFeedback(){
    if (!pages.feedback.visited) {
      setPages(prevPages => {
        let copy = {...prevPages};
        copy.feedback.visited = true;
        return copy;
      });
    }
    setActivePage(prevPage => 'feedback')
  }

  function goToFinalReflection(){
    if (!pages.finalReflection.visited) {
      setPages(prevPages => {
        let copy = {...prevPages};
        copy.finalReflection.visited = true;
        return copy;
      });
    }
    setActivePage(prevPage => 'finalReflection')
  }

  return (
    <div>
      <Grid container direction="row" justify="center" alignItems="center">
        <Box mt = {5}>
          <TextTypography variant="h4" align="center" gutterBottom>
            Summary
          </TextTypography>
        </Box>
      </Grid>
      <Grid container direction="row" justify="space-between">
        <Grid item style={{ marginRight: "0rem", marginTop: "-3rem" }}>
        <Button variant="contained" disableElevation onClick={goToFeedback}>Back</Button>
        </Grid>
        <Grid item style={{ marginRight: "0rem", marginTop: "-3rem" }}>
          <Button variant="contained" disableElevation color="primary" onClick={goToFinalReflection}>Next</Button>
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        <Grid item lg={12}>
          <Box m="2rem">
          </Box>
          <TextTypography variant="body1" align="center">
            Some Summary.
          </TextTypography>
        </Grid>
      </Grid>
    </div>
  );
}

export default Summary;