import React,{useEffect} from "react";
import { makeStyles, withStyles, Typography, Box, Button, Grid } from "@material-ui/core";
import Checkbox from "./components/checkbox";
import { BASE_URL, STUDENT_ID, SCENARIO_ID } from "../constants/config";
import axios from 'axios';
import { ScenariosContext } from "../Nav";

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

function Action({ pages, setPages, activePage, setActivePage, content_url, nextPageID, prevPageID , title }) {
  // function goToInitialReflection() {
  //   if (pages.initialReflection.completed) {
  //     if (!pages.initialReflection.visited) {
  //       setPages(prevPages => {
  //         let copy = { ...prevPages };
  //         copy.initialReflection.visited = true;
  //         return copy;
  //       });
  //     }
  //     setActivePage(prevPage => 'initialReflection')
  //   }
  // }

  // function goToGatheredInformation() {
  //   if (pages.gatheredInformation.completed) {
  //     if (!pages.gatheredInformation.visited) {
  //       setPages(prevPages => {
  //         let copy = { ...prevPages };
  //         copy.gatheredInformation.visited = true;
  //         return copy;
  //       });
  //     }
  //     setActivePage(prevPage => 'gatheredInformation')
  //   }
  // }

  function goToPage(pageID) {
    if (pages[pageID].completed) {
      if (!pages[pageID].visited) {
        setPages((prevPages) => {
          let copy = { ...prevPages };
          copy[pageID].visited = true;
          return copy;
        });
      }
      setActivePage((prevPage) => pageID);
    }
  }

  const [actionQuestion, setActionQuestion, setActionChoices] = React.useState('');
  const [choices, setChoices] = React.useState([]);
  const [scenarios, setScenarios] = React.useContext(ScenariosContext);

  useEffect(() => {
    // backend call
    console.log({content_url});
    (async () => {
      axios({
        method: 'get',
        url: BASE_URL + content_url,
        headers: {
          scenarioID: scenarios.currentScenarioID,
          studentID: STUDENT_ID,
        }
      }).then(response => {
        console.log(response);
        setActionQuestion(text => response.data.question);
        const x = [];
        for (var i = 0; i < response.data.mcq_choices.length; i++)
          x.push({value:response.data.mcq_choices_id[i], label: response.data.mcq_choices[i]});
        console.log(x);
        setChoices(choices => x);
      }).catch((err)=>{
        console.log("err",err);
        //alert(err);
      });
    })();
  }, [scenarios]);

  async function handleResponse(data) {
    await axios({
      url: BASE_URL + content_url,
      method: 'put',
      data: {
        scenarioID: SCENARIO_ID.currentScenarioID,
        studentID: STUDENT_ID,
        data: data
      }
    });
  }

  return (
    <div>
      <Grid container direction="row" justify="center" alignItems="center">
        <Box mt={5}>
          <TextTypography variant="h4" align="center" gutterBottom>
            {title}
          </TextTypography>
        </Box>
      </Grid>
      <Grid container direction="row" justify="space-between">
        <Grid item style={{ marginRight: "0rem", marginTop: "-3rem" }}>
          <Button variant="contained" disableElevation onClick={() => goToPage(prevPageID)}>Back</Button>
        </Grid>
        <Grid item style={{ marginRight: "0rem", marginTop: "-3rem" }}>
          <Button variant="contained" disableElevation color="primary" onClick={() => goToPage(nextPageID)} >Next</Button>
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        <Grid item lg={12}>
          <Box m="2rem">
          </Box>
          <TextTypography variant="body1" align="center">
            {actionQuestion}
          </TextTypography>
        </Grid>
        <Grid item lg={12}>
          <Checkbox content_url = {content_url} nextPage={() => goToPage(nextPageID)} handleResponse={handleResponse} pages={pages} nextPageName={"gatheredInformation"} /> 
        </Grid>
      </Grid>
    </div>
  );
}

export default Action;