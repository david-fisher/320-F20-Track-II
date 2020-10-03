import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import StepContent from "@material-ui/core/StepContent";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";

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

function getSteps(stepNum) {
  let stepArr = [];
  let stepNameArr = ['Introduction', 'Project Assignment','Response', 'Gathered Information', 'Stakeholders','Results', 'FeedBack', 'Response'];
  for(let i = 0; i < stepNum + 1; i++){
    stepArr.push(<Button style={{ color: "#A80909" }}>{stepNameArr[i]}</Button>)
  }
  for(let i = stepNum + 1; i < 8; i++){
    stepArr.push(<Button disabled>{stepNameArr[i]}</Button>)
  }
  
  return stepArr;
}

function getCurrentPageNum(pageName){
  let stepNameArr = ['introduction', 'projectAssignment','responseOne', 'gatheredInformation', 'stakeholders','results', 'feedBack', 'response'];
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
  const pages =  props.pages;
  let curr = getCurrentPageNum(props.activePage);
  const [activeStep, setActiveStep] = React.useState(curr);
  const steps = getSteps(activeStep);

  return (
    <div className={classes.root}>
      <Stepper activeStep={activeStep} orientation="vertical">
        {steps.map((label, index) => (
          <Step key={index}>
            <StepLabel>{label}</StepLabel>
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
    </div>
  );
}