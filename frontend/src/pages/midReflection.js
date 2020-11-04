import React from "react";
import QA from "./components/q&a";
import {
  withStyles,
  Typography,
  Box,
  Grid,
  Button,
  makeStyles,
} from "@material-ui/core";
import { BASE_URL, STUDENT_ID, SCENARIO_ID } from "../constants/config";
import axios from 'axios';

const TextTypography = withStyles({
  root: {
    color: "#373a3c",
    whiteSpace: "pre-wrap",
  },
})(Typography);

const useStyles = makeStyles((theme) => ({
  textBox: {
    overflowY: "auto",
    maxHeight: window.innerHeight * 0.6,
    marginTop: theme.spacing(4),
    borderRadius: "5px",
    boxShadow: "0px 0px 2px",
  },
}));

const mainText = "You have been presented with a scenario about a new project that your company is developing. You have learned more about your role in its development and eventual launch and had the opportunity to gather more information about what you are being asked to do. Taking into consideration what you have most recently learned about the project, please provide responses to the following questions. You must write something, but you’re responses do not need to be highly polished; you should aim for a few thoughtful sentences.";
const questions = [
"Why did you select your chosen source(s) of information?",
"What did you learn that most affects the action that you will take next?",
];

function MiddleReflection({ pages, setPages, activePage, setActivePage }) {
  function goToStakeholders() {
    if (!pages.stakeholders.visited) {
      setPages((prevPages) => {
        let copy = { ...prevPages };
        copy.stakeholders.visited = true;
        return copy;
      });
    }
    setActivePage((prevPage) => "stakeholders");
  }

  function goToResults(){
    if (pages.results.completed) {
    if (!pages.results.visited) {
      setPages(prevPages => {
        let copy = {...prevPages};
        copy.results.visited = true;
        return copy;
      });
    }
    setActivePage(prevPage => 'results')
  }
  }

  const classes = useStyles();

  async function handleResponse(data) {
    await axios({
      url: BASE_URL + '/scenarios/middleReflection',
      method: 'put',
      data: {
        scenarioID: SCENARIO_ID,
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
            Reflect on Stakeholder Information
          </TextTypography>
        </Box>
      </Grid>
      <Grid container direction="row" justify="space-between">
        <Grid item style={{ marginRight: "0rem", marginTop: "-3rem" }}>
          <Button
            variant="contained"
            disableElevation
            onClick={goToStakeholders}
          >
            Back
          </Button>
        </Grid>
        <Grid item style={{ marginRight: "0rem", marginTop: "-3rem" }}>
        </Grid>
      </Grid>

      <Grid container spacing={2}>
        <Grid item lg={12}>
          <Box m="2rem">
          </Box>
          <QA header={mainText} questions={questions} handleResponse={handleResponse} nextPage={goToResults} pages={pages} nextPageName={"results"}/>
        </Grid>
      </Grid>
    </div>
  );
}

export default MiddleReflection;
