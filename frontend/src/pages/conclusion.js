import React from "react";
import { withStyles, Typography, Box, Grid, Button } from "@material-ui/core";
import QA from "./components/q&a";


const TextTypography = withStyles({
  root: {
    color: "#373a3c"
  }
})(Typography);

const bodyText = 'Although current AI offers us few ethical issues that are not already present in the design of cars or power plants, the approach of AI algorithms toward more humanlike thought portends predictable complications. Social roles may be filled by AI algorithms, implying new design requirements like transparency and predictability. Sufficiently general AI algorithms may no longer execute in predictable contexts, requiring new kinds of safety assurance and the engineering of artificial ethical considerations. AIs with sufficiently advanced mental states, or the right kind of states, will have moral status, and some may count as persons—though perhaps persons very much unlike the sort that exist now, perhaps governed by different rules. And finally, the prospect of AIs with superhuman intelligence and superhuman abilities presents us with the extraordinary challenge of stating an algorithm that outputs superethical behavior. These challenges may seem visionary, but it seems predictable that we will encounter them; and they are not devoid of suggestions for present-day research directions.';

const questions = ["We would appreciate receiving any comments that you have on this online ethics simulation: "];

function Conclusion({pages, setPages, activePage, setActivePage}) {
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
            Conclusion
          </TextTypography>
        </Box>
      </Grid>
      <Grid container direction="row" justify="space-between">
        <Grid item style={{ marginRight: "0rem", marginTop: "-3rem" }}>
          <Button variant="contained" disableElevation onClick={goToFinalReflection}>Back</Button>
        </Grid>
        <Grid item style={{ marginRight: "0rem", marginTop: "-3rem" }}>
          {/*<Button variant="outlined">Next</Button>*/}
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        <Grid item lg={12}>
          <Box m="2rem">
          </Box>
          <QA header={bodyText} questions={questions} pages={pages} nextPageName={"conclusion"} />
        </Grid>
      </Grid>
    </div>
  );
}

export default Conclusion;
