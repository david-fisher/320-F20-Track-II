import React from "react";
import {
  makeStyles,
  Typography,
  Paper,
  Stepper,
  Step,
  StepLabel,
  StepContent,
  Button,
  Box,
} from "@material-ui/core";

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
  step: {
    "&$completed": {
      color: "#881C1C",
    },
    "&$active": {
      color: "#881C1C",
    },
    "&$disabled": {
      color: "#444e58",
    },
  },
  active: {},
  completed: {},
  disabled: {},
}));

// const [pages, setPages] = useState({
//   introduction: {visited: true, completed: true, pageNumber: 1, html: (<Introduction/>)},
//   projectAssignment: {visited: false, completed: true, pageNumber: 2, html: (<ProjectAssignment/>)},
//   initialAction: {visited: false, completed: true, pageNumber: 3, html: (<InitialAction/>)},
//   gatheredInformation: {visited: false, completed: false, pageNumber: 4, html: (<GatheredInformation/>)},
//   stakeholders: {visited: false, completed: true, pageNumber: 5, html: (<Stakeholders/>)},
//   results: {visited: false, completed: true, pageNumber: 6, html: (<Results/>)},
//   feedback: {visited: false, completed: true, pageNumber: 7, html: (<Feedback/>)},
//   response: {visited: false, completed: true, pageNumber: 8, html: (<Response/>)}
// });

function getSteps(pages) {
  let stepArr = [];
  let keys = Object.keys(pages);

  for (let i = 0; i < keys.length; i++) {
    let buttonName = keys[i].charAt(0);
    for (let j = 1; j < keys[i].length - 1; j++) {
      if (keys[i].charAt(j) == keys[i].charAt(j).toUpperCase()) {
        buttonName += " ";
      }
      buttonName += keys[i].charAt(j);
    }
    buttonName += keys[i].charAt(keys[i].length - 1);
    if (pages[keys[i]].visited === false) {
      stepArr.push(<Button disabled>{buttonName}</Button>);
    } else {
      stepArr.push(<Button style={{ color: "#881c1c" }}>{buttonName}</Button>);
    }
  }
  return stepArr;
}

// for testing purposes
function getCurrentPageNum(pageName) {
  let stepNameArr = [
    "introduction",
    "projectAssignment",
    "initialAction",
    "gatheredInformation",
    "stakeholders",
    "results",
    "feedback",
    "response",
  ];
  for (let i = 0; i < stepNameArr.length; i++) {
    if (pageName === stepNameArr[i]) {
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
  // eslint-disable-next-line
  const [activeStep, setActiveStep] = React.useState(curr);
  const steps = getSteps(props.pages);

  return (
    <div className={classes.root}>
      <Box mt={3} ml={1}>
        <Stepper activeStep={activeStep} orientation="vertical">
          {steps.map((label, index) => (
            <Step
              key={index}
              classes={{
                root: classes.step,
                completed: classes.completed,
                active: classes.active,
              }}
            >
              <StepLabel
                StepIconProps={{
                  classes: {
                    root: classes.step,
                    completed: classes.completed,
                    active: classes.active,
                  },
                }}
              >
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
