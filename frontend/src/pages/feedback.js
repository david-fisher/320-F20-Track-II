import React from "react";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";
import Grid from "@material-ui/core/grid";
import { Typography, Box } from "@material-ui/core";

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
        <Typography variant="h4" align="center" gutterBottom>
          Feedback
        </Typography>
      </Grid>
      <Grid container direction="row" justify="space-between">
        <Grid item style={{ marginLeft: "2rem", marginBottom: "1rem" }}>
        <Button variant="light" onClick={goToResults}>Back</Button>
        </Grid>
        <Grid item style={{ marginRight: "2rem", marginBottom: "1rem" }}>
          <Button variant="primary" onClick={goToResponse}>Next</Button>
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        <Grid item lg={12}>
          <Box m="2rem">
          </Box>
          <Typography variant="body1" align="center">
            Some Feedback.
          </Typography>
        </Grid>
      </Grid>
    </div>
  );
}

export default Feedback;