import React from "react";
import { withStyles, Typography, Box, Grid, Button } from "@material-ui/core";


const TextTypography = withStyles({
  root: {
    color: "#373a3c"
  }
})(Typography);

function Response({pages, setPages, activePage, setActivePage}) {
  function goToFeedBack(){
    if (!pages.feedback.visited) {
      setPages(prevPages => {
        let copy = {...prevPages};
        copy.feedback.visited = true;
        return copy;
      });
    }
    setActivePage(prevPage => 'feedback')
  }

  return (
    <div>
      <Grid container direction="row" justify="center" alignItems="center">
        <Box mt = {5}>
          <TextTypography variant="h4" align="center" gutterBottom>
            Response
          </TextTypography>
        </Box>
      </Grid>
      <Grid container direction="row" justify="space-between">
        <Grid item style={{ marginRight: "0rem", marginTop: "-3rem" }}>
          <Button variant="contained" disableElevation onClick={goToFeedBack}>Back</Button>
        </Grid>
        <Grid item style={{ marginRight: "0rem", marginTop: "-3rem" }}>
          {/*<Button variant="outlined">Next</Button>*/}
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
        {/* <Grid item lg={12}>
          next button here if needed
        </Grid>   */}
      </Grid>
    </div>
  );
}

export default Response;
