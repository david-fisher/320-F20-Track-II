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

const mainText = "You have been presented with a scenario about a new project that your company is developing. You have learned more about your role in its development and eventual launch and had the opportunity to gather more information about what you are being asked to do. After selecting a course of action to take, you were presented with a set of possible consequences resulting from your choices within the scenario, please provide responses to the following questions. You must write something, but you’re responses do not need to be highly polished; you should aim for a few thoughtful sentences.";

const questions = [
  "Do the consequences presented match your expectations for what you thought would happen? Explain your answer.",
  "Considering these consequences, how satisfied are you with your choices? In other words, how would you approach a similar situation in the future? Be sure to explain what you might keep the same and what you would change.",
];

function FinalReflection({ pages, setPages, activePage, setActivePage }) {
  function goToFeedback() {
    if (!pages.feedback.visited) {
      setPages((prevPages) => {
        let copy = { ...prevPages };
        copy.feedback.visited = true;
        return copy;
      });
    }
    setActivePage((prevPage) => "feedback");
  }

  function goToResponse() {
    if (pages.response.completed) {
      if (pages.response.completed) {
        if (!pages.response.visited) {
          setPages((prevPages) => {
            let copy = { ...prevPages };
            copy.response.visited = true;
            return copy;
          });
        }
        setActivePage((prevPage) => "response");
      }
    }
  }

  const classes = useStyles();

  return (
    <div>
      <Grid container direction="row" justify="center" alignItems="center">
        <Box mt={5}>
          <TextTypography variant="h4" align="center" gutterBottom>
            Reflect on Final Information
          </TextTypography>
        </Box>
      </Grid>
      <Grid container direction="row" justify="space-between">
        <Grid item style={{ marginRight: "0rem", marginTop: "-3rem" }}>
          <Button
            aria-label = "go to feedback, back"
            variant="contained"
            disableElevation
            onClick={goToFeedback}
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
          <QA header={mainText} questions={questions} nextPage={goToResponse} pages={pages} nextPageName={"response"} />
        </Grid>
      </Grid>
    </div>
  );
}

export default FinalReflection;
