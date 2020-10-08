import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { withStyles,Typography, Box, Grid, Button } from "@material-ui/core";

const TextTypography = withStyles({
  root: {
    color: "#373a3c"
  }
})(Typography);

function Feedback({pages, setPages, activePage, setActivePage}) {
  function goToResults(){
    if (!pages.results.visited) {
      setPages(prevPages => {
        let copy = {...prevPages};
        copy.results.visited = true;
        return copy;
      });
    }
    setActivePage(prevPage => 'results')
  }

  function goToResponse(){
    if (!pages.response.visited) {
      setPages(prevPages => {
        let copy = {...prevPages};
        copy.response.visited = true;
        return copy;
      });
    }
    setActivePage(prevPage => 'response')
  }

  return (
    <div>
      <Grid container direction="row" justify="center" alignItems="center">
        <Box mt = {5}>
          <TextTypography variant="h4" align="center" gutterBottom>
            Feedback
          </TextTypography>
        </Box>
      </Grid>
      <Grid container direction="row" justify="space-between">
        <Grid item style={{ marginRight: "2rem", marginRight: "0rem", marginTop: "-3rem" }}>
        <Button variant="contained" disableElevation onClick={goToResults}>Back</Button>
        </Grid>
        <Grid item style={{ marginRight: "2rem", marginRight: "0rem", marginTop: "-3rem" }}>
          <Button variant="contained" disableElevation color="primary" onClick={goToResponse}>Next</Button>
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        <Grid item lg={12}>
          <Box m="2rem">
          </Box>
          <TextTypography variant="body1" align="center">
            Some Feedback.
          </TextTypography>
        </Grid>
      </Grid>
    </div>
  );
}

export default Feedback;