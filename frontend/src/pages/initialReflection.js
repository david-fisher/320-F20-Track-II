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
import { BASE_URL, STUDENT_ID, SCENARIO_ID }from "../constants/config";
import axios from 'axios';
import { ScenariosContext } from "../Nav";

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

const mainText = "You have just been presented with a scenario about a new project that your company is developing. You have a role to play in the development and eventual launch of that project. Thinking about that role and about what you have learned about this new project, please provide responses to the following questions. You must write something, but your responses do not need to be highly polished; you should aim for a few thoughtful sentences.";
// const questions = [
// "Why did you select your chosen source(s) of information?",
// "What did you learn that most affects the action that you will take next?",
// ];

const questions = [
"What new responsibilities do you have after being asssigned to this project?",
"What aren't you sure about, or what questions are raised for you about those responsibilities?",
];

function InitialReflection({ pages, setPages, activePage, setActivePage }) {
  function goToProjectAssignment() {
    if (!pages.projectAssignment.visited) {
      setPages((prevPages) => {
        let copy = { ...prevPages };
        copy.projectAssignment.visited = true;
        return copy;
      });
    }
    setActivePage((prevPage) => "projectAssignment");
  }

  function goToInitialAction() {
    if (pages.initialAction.completed) {
      if (!pages.initialAction.visited) {
        setPages((prevPages) => {
          let copy = { ...prevPages };
          copy.initialAction.visited = true;
          return copy;
        });
      }
      setActivePage((prevPage) => "initialAction");
    }
  }

  const classes = useStyles();

  const [bodyText, setBodyText] = React.useState('');
  const [prompts, setPrompts] = React.useState([]);
  const [promptResponses, setPromptResponses] = React.useState({});
  const [scenarios, setScenarios] = React.useContext(ScenariosContext);

  React.useEffect(() => {
    (async () => {
      await axios({
        method: 'get',
        url: BASE_URL + '/scenarios/initialReflection',
        headers: {
          scenarioID: scenarios.currentScenarioID
        }
      }).then(response => {
        setBodyText(response.data.body_text);
        setPrompts(prev => response.data.prompts);
      }).catch(err => {
        console.log(err);
        alert(err);
      });

      axios({
        method: 'get',
        url: BASE_URL + '/scenarios/initialReflection/response',
        headers: {
          scenarioID: scenarios.currentScenarioID,
          studentID: STUDENT_ID
        }
      }).then(response => {
        setPromptResponses(response.data.reduce((prev, curr) => {
          prev[curr.prompt_num] = curr.response;
          return prev;
        }, {}));
      }).catch(err => {
        console.log(err);
      });
    })();
  }, [scenarios]);

  async function handleResponse(data) {
    await axios({
      url: BASE_URL + '/scenarios/initialReflection',
      method: 'put',
      data: {
        scenarioID: scenarios.currentScenarioID,
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
            Reflect on Initial Information
          </TextTypography>
        </Box>
      </Grid>
      <Grid container direction="row" justify="space-between">
        <Grid item style={{ marginRight: "0rem", marginTop: "-3rem" }}>
          <Button
            variant="contained"
            disableElevation
            onClick={goToProjectAssignment}
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
            <QA header={bodyText} questions={prompts} handleResponse={handleResponse}
              nextPage={goToInitialAction} pages={pages} nextPageName={"initialAction"}
              prevResponses={promptResponses}/>
        </Grid>
      </Grid>
    </div>
  );
}

export default InitialReflection;
