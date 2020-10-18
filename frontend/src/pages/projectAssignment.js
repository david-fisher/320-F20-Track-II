import React from "react";
import { withStyles, Typography, Box, Grid, Button } from "@material-ui/core";

const TextTypography = withStyles({
  root: {
    color: "#373a3c"
  }
})(Typography);

function ProjectAssignment({pages, setPages, activePage, setActivePage}) {

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

  return (
    <div>
      <Grid container direction="row" justify="center" alignItems="center">
        <Box mt = {5}>
          <TextTypography variant="h4" align="center" gutterBottom>
            the first response
          </TextTypography>
        </Box>
      </Grid>
      <Grid container direction="row" justify="space-between">
        <Grid item style={{ marginRight: "0rem", marginTop: "-3rem" }}>
        <Button variant="contained" disableElevation onClick={goToIntroduction}>Back</Button>
        </Grid>
        <Grid item style={{ marginRight: "0rem",  marginTop: "-3rem" }}>
          <Button variant="contained" disableElevation color="primary" onClick={goToInitialAction}>Next</Button>
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

export default ProjectAssignment;