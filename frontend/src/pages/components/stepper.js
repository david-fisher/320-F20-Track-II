import React from "react";
import { makeStyles,Typography, Paper, Stepper, Step, 
        StepLabel, StepContent, Button, Box} 
from "@material-ui/core";



const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  button: {
    marginTop: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  actionsContainer: {
    marginBottom: theme.spacing(2),
  },
  resetContainer: {
    padding: theme.spacing(3),
  },
}));

function getSteps(pages) {
  let stepArr = [];
  let keys = Object.keys(pages)
  
  for(let i = 0; i < keys.length; i++){
    let buttonName = keys[i].charAt(0).toUpperCase() + keys[i].slice(1);
    if(pages[keys[i]].visited == false){
      stepArr.push(<Button disabled>{buttonName}</Button>)
    }else{
      stepArr.push(<Button style={{ color: "#881c1c" }}>{buttonName}</Button>)
    }
  }
  return stepArr;
}

// for testing purposes
function getCurrentPageNum(pageName){
  let stepNameArr = ['introduction', 'projectAssignment','responseOne', 'gatheredInformation', 'stakeholders','results', 'feedback', 'response'];
  for(let i = 0; i < stepNameArr.length; i++){
    if(pageName == stepNameArr[i]){
      return i;
    }
  }
}

function getStepContent(step) {
  switch (step) {
    case 0:
      return ``;
    case 1:
      return "";
    case 2:
      return ``;
    default:
      return "";
  }
}

export default function VerticalLinearStepper(props) {
  //<Stepper activePage={activePage} pages={pages} />
  const classes = useStyles();
  let curr = getCurrentPageNum(props.activePage);
  const [activeStep, setActiveStep] = React.useState(curr);
  const steps = getSteps(props.pages);


  return (
    <div className={classes.root}>
      <Box mt = {3} ml = {1}>
       
          <Stepper activeStep={activeStep} orientation="vertical">
            {steps.map((label, index) => (
              <Step key={index}>
                <StepLabel
                icon = {<div style={{backgroundColor: '#881c1c', width:'30px', padding: '2px', textAlign: 'center', color : '#ced4da',height: '30px', fontSize: '17.5px', borderRadius: '50%'}}>{index + 1}</div>}>
                  {label}
                </StepLabel>
                <StepContent>
                  <Typography>{getStepContent(index)}</Typography>
                  <div className={classes.actionsContainer}>
                    <div></div>
                  </div>
                </StepContent>
              </Step>
            ))}
          </Stepper>

          {activeStep === steps.length && (
            <Paper square elevation={0} className={classes.resetContainer}>
              <Typography>All steps completed - you&apos;re finished</Typography>
            </Paper>
          )}
        
      </Box>
    </div>
  );
}