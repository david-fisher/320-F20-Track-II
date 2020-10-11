import React from "react";
import { makeStyles, withStyles, Typography, Box, Button, Grid } from "@material-ui/core";
import Checkbox from "./components/checkbox";

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
  let goToResponseOne = ()=>{
    if(pages.responseOne.completed && !pages.responseOne.visited) {
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
          What should we not automate? 
          </TextTypography>
        </Box>
      </Grid>
      <Grid container direction="row" justify="space-between">
        <Grid item style={{ marginRight: "0rem", marginTop: "-3rem" }}>
          <Button variant="contained" disableElevation onClick={goToIntroduction}>Back</Button>
        </Grid>
        <Grid item style={{marginRight: "0rem", marginTop: "-3rem" }}>
          <Button variant="contained" disableElevation color="primary" onClick={goToResponseOne} >Next</Button>
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        <Grid item lg={12}>
          <Box m="2rem">
          </Box>
          <TextTypography variant="body1" align="center">
            Should there be some occupations or parts of human life where Artificial Intelligence and the use of robots are prohibited? 
          </TextTypography>
        </Grid>
        <Grid item lg={12}>
          <Checkbox nextPage = {goToResponseOne} pages={pages} nextPageName={"responseOne"}/>
          </Grid>
      </Grid>
    </div>
  );
}

export default projectAssignment;