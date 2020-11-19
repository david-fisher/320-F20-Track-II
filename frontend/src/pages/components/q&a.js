import React, { useState } from "react";
import { Box, Grid, Typography , withStyles, Button, FormHelperText } from '@material-ui/core';

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

// onChange={(event) => {
//   setTestInput3(event.target.value);

function getQuestions(questionArr, responses, setResponses) {
  let arr = [];
  for (let i = 0; i < questionArr.length; i++) {
    let question = questionArr[i];
    let textboxId = 'textBox' + i;
    arr.push(
      <div>
        <p><b>{question}</b></p>
        <textarea id={textboxId} value={responses[i]} onChange={event => {
          const target = event.target
          setResponses((reses) => {
            let newList = [...reses];
            newList[i] = target.value;
            return newList;
          });
        }}
          rows="4" cols="90" style={{ resize: "none" }}></textarea>
      </div>
    )
  }
  return arr;
}

export default function StateTextFields(props) {
  
  const [responses, setResponses] = React.useState(props.questions.map(question => ''));

  let qAndA = getQuestions(props.questions, responses, setResponses).map((question) => <>{question}</>)
  let header = props.header;
  const [helperText, setHelperText] = React.useState('');


  const handleSubmit = (event) => {
    event.preventDefault();
    if(!responses.includes('')){
      props.handleResponse(responses).then(res => {
        props.pages[props.nextPageName].completed = true;
        props.nextPage();
      }).catch(err => alert(err))
    }else{
      setHelperText('Please provide a response.');
    }
  };
  
  return (
    <form onSubmit={handleSubmit}>
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
        <FormHelperText>{helperText}</FormHelperText>
          <Button type="submit" variant="outlined" color="primary">
            Submit
          </Button>
        </Grid>
      </Grid>
    </form>


  );
}
