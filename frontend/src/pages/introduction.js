import React from "react";
import { withStyles, Typography, Box, Grid, Button, makeStyles } from "@material-ui/core";


const TextTypography = withStyles({
  root: {
    color: "#373a3c",
    whiteSpace: 'pre-line'
  }
})(Typography);

const useStyles = makeStyles(theme => ({
  textBox:{
    overflowY: 'auto',
    maxHeight: window.innerHeight * 0.6,
    marginTop: theme.spacing(4),
    borderRadius: '5px',
    boxShadow: '0px 0px 2px'
  }
}))

// placeholder text
const introText ="A good place to start on this course is to look at the reasons why we should study it at all. To facilitate this, we look at a few scenarios. For each of these scenarios, you should write think about any questionable ethical issues about each scenario. At his point you may not be to answer them, but you might have your own opinion. Write this down as well you should revisit them after relevant section and see if your opinion has been affected. Hopefully these typical ethical questions illustrates to you the diverse characters of ethical issues including, property rights, privacy, free speech and professional ethics. Is computer ethics different to those that came before. Partially, the answer is no since all fields have similar problems and issue. Partially, the answer is also yes, since there are issuesspecific to computerssuch asspeed and programs etc. \n\n A good place to start on this course is to look at the reasons why we should study it at all. To facilitate this, we look at a few scenarios. For each of these scenarios, you should write think about any questionable ethical issues about each scenario. At his point you may not be to answer them, but you might have your own opinion. Write this down as well you should revisit them after relevant section and see if your opinion has been affected. Hopefully these typical ethical questions illustrates to you the diverse characters of ethical issues including, property rights, privacy, free speech and professional ethics. Is computer ethics different to those that came before. Partially, the answer is no since all fields have similar problems and issue. Partially, the answer is also yes, since there are issuesspecific to computerssuch asspeed and programs etc.\n\nA good place to start on this course is to look at the reasons why we should study it at all. To facilitate this, we look at a few scenarios. For each of these scenarios, you should write think about any questionable ethical issues about each scenario. At his point you may not be to answer them, but you might have your own opinion. Write this down as well you should revisit them after relevant section and see if your opinion has been affected. Hopefully these typical ethical questions illustrates to you the diverse characters of ethical issues including, property rights, privacy, free speech and professional ethics. Is computer ethics different to those that came before. Partially, the answer is no since all fields have similar problems and issue. Partially, the answer is also yes, since there are issuesspecific to computerssuch asspeed and programs etc. \n\n A good place to start on this course is to look at the reasons why we should study it at all. To facilitate this, we look at a few scenarios. For each of these scenarios, you should write think about any questionable ethical issues about each scenario. At his point you may not be to answer them, but you might have your own opinion. Write this down as well you should revisit them after relevant section and see if your opinion has been affected. Hopefully these typical ethical questions illustrates to you the diverse characters of ethical issues including, property rights, privacy, free speech and professional ethics. Is computer ethics different to those that came before. Partially, the answer is no since all fields have similar problems and issue. Partially, the answer is also yes, since there are issuesspecific to computerssuch asspeed and programs etc.\n\nA good place to start on this course is to look at the reasons why we should study it at all. To facilitate this, we look at a few scenarios. For each of these scenarios, you should write think about any questionable ethical issues about each scenario. At his point you may not be to answer them, but you might have your own opinion. Write this down as well you should revisit them after relevant section and see if your opinion has been affected. Hopefully these typical ethical questions illustrates to you the diverse characters of ethical issues including, property rights, privacy, free speech and professional ethics. Is computer ethics different to those that came before. Partially, the answer is no since all fields have similar problems and issue. Partially, the answer is also yes, since there are issuesspecific to computerssuch asspeed and programs etc. \n\n A good place to start on this course is to look at the reasons why we should study it at all. To facilitate this, we look at a few scenarios. For each of these scenarios, you should write think about any questionable ethical issues about each scenario. At his point you may not be to answer them, but you might have your own opinion. Write this down as well you should revisit them after relevant section and see if your opinion has been affected. Hopefully these typical ethical questions illustrates to you the diverse characters of ethical issues including, property rights, privacy, free speech and professional ethics. Is computer ethics different to those that came before. Partially, the answer is no since all fields have similar problems and issue. Partially, the answer is also yes, since there are issuesspecific to computerssuch asspeed and programs etc.";

function Introduction({ pages, setPages, activePage, setActivePage }) {
  function goToPrjectAssignment() {
    if (!pages.projectAssignment.visited) {
      setPages(prevPages => {
        let copy = { ...prevPages };
        copy.projectAssignment.visited = true;
        return copy;
      });
    }
    setActivePage(prevPage => 'projectAssignment')
  }

  const classes = useStyles();

  return (
    <div>
    <Box mt = {5}>
      <Grid container direction="row" justify="center" alignItems="center">
          <TextTypography variant="h4" align="center" gutterBottom>
            Introduction
          </TextTypography>
      </Grid>
      </Box>
      <Grid container direction="row" justify="space-between">
       <Grid item style={{ marginLeft: "0rem", marginRight: "0rem", marginTop: "-3rem" }}>
         {/*  <Button>Back</Button>*/}
        </Grid>
        <Grid item style={{ marginRight: "0rem",  marginTop: "-3rem" }}>
          <Button variant="contained" disableElevation color="primary" onClick={goToPrjectAssignment}>Next</Button>
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        <Grid item lg={12}>
          <Box p={2} className={classes.textBox}>
            <TextTypography variant="body1">
              {introText}
            </TextTypography>
          </Box>
        </Grid>
      </Grid>
    </div>
  );
}

export default Introduction;