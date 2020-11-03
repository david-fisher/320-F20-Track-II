import React, { useState } from "react";
import { Box, Grid, Typography , withStyles, Button } from '@material-ui/core';

const alignMiddle = {
  position: 'fixed',
  left: '50%',
  top: '50%',
  transform: 'translate(-50%, -50%)',
}

const TextTypography = withStyles({
  root: {
    color: "#373a3c",
    whiteSpace: "pre-line",
    textAlign: 'left'
  },
})(Typography);

function getQuestions(questionArr) {
  let arr = [];
  for (let i = 0; i < questionArr.length; i++) {
    let question = questionArr[i];
    arr.push(
      <div>
        <p><b>{question}</b></p>
        <textarea rows="4" cols="90" style={{ resize: "none" }}></textarea>
      </div>
    )
  }
  return arr;
}

export default function StateTextFields(props) {
  const [testInput1, setTestInput1] = useState("");
  let qAndA = getQuestions(props.questions).map((question) => <>{question}</>)
  let header = props.header;

  const [value, setValue] = React.useState('');
  const [error, setError] = React.useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    setError(true);
    console.log(props.nextPageName)
    props.pages[props.nextPageName].completed = true;
    props.nextPage();
  };

  return (
    <form aria-label = {"add response to questions: " + props.questions} onSubmit={handleSubmit}>
    <Grid container spacing={2}>
      <Grid item lg={12}>
        <TextTypography variant="body1" align="center">
          {header}
        </TextTypography>
      </Grid>
      <Grid item lg={12}>
        <TextTypography variant="body1" align="center">
          {qAndA}
        </TextTypography>
      </Grid>
      <Grid item lg={12}>
        <Button aria-label = "submit" type="submit" variant="outlined" color="primary">
          Submit
        </Button>
      </Grid>
    </Grid>
    </form>


  );
}
