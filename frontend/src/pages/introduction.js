import React,{useEffect} from "react";
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
    whiteSpace: "pre-line",
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

function Introduction({ pages, setPages, activePage, setActivePage }) {
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

  const [introText, setIntroText] = React.useState('');
  const classes = useStyles();

  // backend call
  axios({
    method: 'get',
    url: BASE_URL + '/scenarios/intro',
    headers: {
      scenarioID: SCENARIO_ID,
      studentID: STUDENT_ID,
    }
  }).then(response => {
    setIntroText(text => response.data[0].introduction);
  }).catch((err)=>{
    console.log("err",err);
    alert(err);
  });

  return (
    <div>
      <Box mt={5}>
        <Grid container direction="row" justify="center" alignItems="center">
          <TextTypography variant="h4" align="center" gutterBottom>
            Introduction
          </TextTypography>
        </Grid>
      </Box>
      <Grid container direction="row" justify="space-between">
        <Grid
          item
          style={{
            marginLeft: "0rem",
            marginRight: "0rem",
            marginTop: "-3rem",
          }}
        >
          {/*  <Button>Back</Button>*/}
        </Grid>
        <Grid item style={{ marginRight: "0rem", marginTop: "-3rem" }}>
          <Button
            variant="contained"
            disableElevation
            color="primary"
            onClick={goToProjectAssignment}
          >
            Next
          </Button>
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        <Grid item lg={12}>
          <Box p={2} className={classes.textBox}>
            <TextTypography variant="body1">{introText}</TextTypography>
          </Box>
        </Grid>
      </Grid>
    </div>
  );
}

export default Introduction;
