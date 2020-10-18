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

const mainText =
  "You have just been presented with a scenario about a new project that your company is developing. You have a role to play in the development and eventual launch of that project. Thinking about that role and about what you have learned about this new project, please provide responses to the following questions. You must write something, but your responses do not need to be highly polished; you should aim for a few thoughtful sentences.";

function InitialReflection({ pages, setPages, activePage, setActivePage }) {
  function goToPrjectAssignment() {
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
            onClick={goToPrjectAssignment}
          >
            Back
          </Button>
        </Grid>
        <Grid item style={{ marginRight: "0rem", marginTop: "-3rem" }}>
          <Button
            variant="contained"
            disableElevation
            color="primary"
            onClick={goToInitialAction}
          >
            Next
          </Button>
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        <Grid item lg={12}>
          <QA />
        </Grid>
      </Grid>
    </div>
  );
}

export default InitialReflection;
