import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { makeStyles, withStyles, Typography, Box, Button, Grid } from "@material-ui/core";

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

function projectAssignment({pages, setPages, activePage, setActivePage}) {
  function goToIntroduction(){
    if (!pages.introduction.visited) {
      setPages(prevPages => {
        let copy = {...prevPages};
        copy.introduction.visited = true;
        return copy;
      });
    }
    setActivePage(prevPage => 'introduction')
  }
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

  return (
    <div>
      <Grid container direction="row" justify="center" alignItems="center">
        <Box mt = {5}>
          <TextTypography variant="h4" align="center" gutterBottom>
            some project assignment
          </TextTypography>
        </Box>
      </Grid>
      <Grid container direction="row" justify="space-between">
        <Grid item style={{ marginRight: "2rem", marginRight: "0rem", marginTop: "-3rem" }}>
          <Button variant="contained" disableElevation onClick={goToIntroduction}>Back</Button>
        </Grid>
        <Grid item style={{ marginRight: "2rem", marginRight: "0rem", marginTop: "-3rem" }}>
          <Button variant="contained" disableElevation color="primary" onClick={goToResponseOne} >Next</Button>
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        <Grid item lg={12}>
          <Box m="2rem">
          </Box>
          <TextTypography variant="body1" align="center">
            Some Response.
          </TextTypography>
        </Grid>
      </Grid>
    </div>
  );
}

export default projectAssignment;