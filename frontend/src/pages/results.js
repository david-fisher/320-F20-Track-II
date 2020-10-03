import React from "react";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";
import Grid from "@material-ui/core/grid";
import Radar from "./chart/chart";

import { Typography, Box } from "@material-ui/core";

function Results({pages, setPages, activePage, setActivePage}) {
  function goToResponse(){
    if (!pages.response.visited) {
      setPages(prevPages => {
        let copy = {...prevPages};
        copy.response.visited = true;
        return copy;
      });
    }
    setActivePage(prevPage => 'response');
  }
  let Summary_Value = 2.03;
  let Coverage = { Safety: 0.5, Salary: 0.667, Reputation: 1.0, Privacy: 0.8 };
  return (
    <div>
      <Grid container direction="row" justify="center" alignItems="center">
        <Typography variant="h4" align="center" gutterBottom>
          Coverage Of Issues
        </Typography>
      </Grid>
      <Grid container direction="row" justify="space-between">
        <Grid item style={{ marginLeft: "2rem", marginBottom: "1rem" }}>
          <Button variant="light">Back</Button>
        </Grid>
        <Grid item style={{ marginRight: "2rem", marginBottom: "1rem" }}>
          <Button variant="primary" onClick={goToResponse}>Next</Button>
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        <Grid item lg={12}>
          <Box m="2rem">
            <Radar coverage={Coverage} summary={Summary_Value} />
          </Box>
          <Typography variant="body1">
            Artificial intelligence and machine learning technologies are
            rapidly transforming society and will continue to do so in the
            coming decades. This social transformation will have deep ethical
            impact, with these powerful new technologies both improving and
            disrupting human lives. AI, as the externalization of human
            intelligence, offers us in amplified form everything that humanity
            already is, both good and evil. Much is at stake. At this crossroads
            in history we should think very carefully about how to make this
            transition, or we risk empowering the grimmer side of our nature,
            rather than the brighter.
          </Typography>
        </Grid>
      </Grid>
    </div>
  );
}

export default Results;
