import React, { useContext } from "react";
import { makeStyles, withStyles, Typography, Box, Grid, Button,
  Card, CardContent, Modal, Dialog, DialogContent, DialogContentText } from "@material-ui/core";
import { useTheme } from "@material-ui/core/styles";
import { GatheredInfoContext } from './simulationWindow';
import { BASE_URL, STUDENT_ID, SCENARIO_ID } from "../constants/config";
import axios from 'axios';
import Conversation from './conversation';
import HTMLRenderer from './components/htmlRenderer';

const TextTypography = withStyles({
  root: {
    color: "#373a3c"
  }
})(Typography);

const introText = "Please select the Stakeholder you would like to interact with...";
const stakeholders = [
  { name: 'Bob Smith', description: 'I am Bob Smith' , id: 0, background: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'},
  { name: 'b', description: 'I am stakeholder b' , id: 1, background: 'really cool background for stakeholder B this is not placeholder data'.repeat(2)},
  { name: 'c', description: 'I am stakeholder c' , id: 2, background: 'really cool background for stakeholder C this is not placeholder data'},
  { name: 'd', description: 'I am stakeholder d' , id: 3, background: 'really cool background for stakeholder D this is not placeholder data'},
  { name: 'e', description: 'I am stakeholder e' , id: 4, background: 'really cool background for stakeholder E this is not placeholder data'},
  { name: 'f', description: 'I am stakeholder f' , id: 5, background: 'really cool background for stakeholder F this is not placeholder data'},
  { name: 'g', description: 'I am stakeholder g' , id: 6, background: 'really cool background for stakeholder G this is not placeholder data'},
  { name: 'h', description: 'I am stakeholder h' , id: 7, background: 'abc'}
  ];
const CONVERSATION_LIMIT = 2;

function ellipses(str, cutoff) {
  let newStr = str;
  if (str.length >= cutoff) {
    newStr = str.substring(0, cutoff - 1) + '…';
    let lastSpace = newStr.lastIndexOf(' ');
    if (lastSpace !== -1) {
      newStr = newStr.substring(0, lastSpace) + '…';
    }
  }
  return newStr;
}

function Stakeholders({ pages, setPages, activePage, setActivePage }) {
  const theme = useTheme();

  const cardStyles = makeStyles({
    root: {
      width: 275,
      height: 156,
      wordBreak: 'break-word'
    },
    name: {
      color: theme.palette.primary.main
    },
    background: {
      color: '#444e58'
    },
    disabled: {
      backgroundColor: '#f9f9f9',
      color: '#c2c2c2'
    }
  });

  const [modalOpenToggles, setModalOpenToggles] = React.useState(
    stakeholders.reduce((obj, stakeholder) => {
      obj[stakeholder.id] = false;
      return obj;
    }, {})
  );
  const [gatheredInfo, setGatheredInfo] = useContext(GatheredInfoContext);
  const [showStakeholders, setShowStakeholders] = React.useState(true);
  const [currentStakeholder, setCurrentStakeholder] = React.useState({});
  const [numStakeholderTalkedTo, setNumStakeholderTalkedTo] = React.useState(0);
  const [stakeholdersDisabled, setStakeholdersDisabled] = React.useState(
    stakeholders.reduce((obj, stakeholder) => {
      obj[stakeholder.id] = false;
      return obj;
    }, {})
  );
  const stakeholdersGrid = getStakeholdersGrid(stakeholders);
 

  function getStakeholderCards(id, name, description, background) {
    const card = cardStyles();
    const PAGE_ID_OF_PAGE_BEFORE_CONVERSATIONS = 'gatheredInformation';

    function toggleModal(id, toggle) {
      setModalOpenToggles(prev => {
        let newToggles = {...prev};
        newToggles[id] = toggle;
        return newToggles;
      });
    }
    let cardClass, nameClass, backgroundClass;
    if (stakeholdersDisabled[id]) {
      cardClass = `${card.root} ${card.disabled}`;
      nameClass = backgroundClass = card.disabled;
    } else {
      cardClass = card.root;
      nameClass = card.name;
      backgroundClass = card.background;
    }
    return (
      <>
        <Button disabled={stakeholdersDisabled[id]} style={{textTransform: 'none'}} onClick={() => toggleModal(id, true)}>
          <Card className={cardClass}>
            <CardContent>
              <Typography variant="h5" component="h2" align='left' className={nameClass}>
                {name}
              </Typography>
              <Typography variant="body1" component="p" align='left'>
                {description}
              </Typography>
              <Typography variant="body2" component="p" align='left' className={backgroundClass}>
                {ellipses(background, 87)}
              </Typography>
            </CardContent>
          </Card>
        </Button>
        <Dialog
          open={modalOpenToggles[id]}
          onClose={() => toggleModal(id, false)}
          maxWidth = {'md'}
          >
          <DialogContent>
            <HTMLRenderer html={background}/>
            <Button variant="contained" onClick={() => {
                setCurrentStakeholder(prev => ({
                  name: name,
                  id: id
                }));
                setStakeholdersDisabled(prev => {
                  let newStakeholdersDisabled = {...prev};
                  if (numStakeholderTalkedTo + 1 >= CONVERSATION_LIMIT) {
                    for (const id in newStakeholdersDisabled) {
                      newStakeholdersDisabled[id] = true;
                    }
                  } else {
                    newStakeholdersDisabled[id] = true;
                  }
                  return newStakeholdersDisabled;
                });
                setNumStakeholderTalkedTo(prev => {
                  return (prev + 1)
                });
                setShowStakeholders(false);
                toggleModal(id, false);
                setGatheredInfo(infos => {
                  let ind = infos.findIndex(info => info.pageId === PAGE_ID_OF_PAGE_BEFORE_CONVERSATIONS);
                  if (ind < 0) { ind = infos.length; }
                  let newInfos = [...infos];
                  newInfos.splice(ind, 0,
                    { name: name, id: `stakeholder:${id}`, pageId: 'stakeholders'});
                  return newInfos;
                });
              }}>Continue</Button>
          </DialogContent>
        </Dialog>
      </>
    )
  }

  function getStakeholdersGrid(stakeholders) {
    let items = stakeholders.map(stakeholder => getStakeholderCards(
      stakeholder.id, stakeholder.name, stakeholder.description, stakeholder.background));
    return (
      <div>
        <Grid container spacing={3} justify={'center'}>
          {items.map(item => ((
            <Grid item>
              {item}
            </Grid>
          )))}
        </Grid>
      </div>
    )
  }

  function goToGatheredInformation() {
    if (!pages.gatheredInformation.visited) {
      setPages(prevPages => {
        let copy = { ...prevPages };
        copy.gatheredInformation.visited = true;
        return copy;
      });
    }
    setActivePage(prevPage => 'gatheredInformation')
  }

  function goToMiddleReflection() {
    if (!pages.middleReflection.visited) {
      setPages(prevPages => {
        let copy = { ...prevPages };
        copy.middleReflection.visited = true;
        return copy;
      });
    }
    setActivePage(prevPage => 'middleReflection')
  }
  return (
    <>
      {showStakeholders &&
        <div>
        <Grid container direction="row" justify="center" alignItems="center">
          <Box mt={5}>
            <TextTypography variant="h4" align="center" gutterBottom>
              Stakeholders
            </TextTypography>
          </Box>
        </Grid>
        <Grid container direction="row" justify="space-between">
          <Grid item style={{ marginRight: "0rem", marginTop: "-3rem" }}>
            <Button variant="contained" disableElevation onClick={goToGatheredInformation}>Back</Button>
          </Grid>
          <Grid item style={{ marginRight: "0rem", marginTop: "-3rem" }}>
            <Button variant="contained" disableElevation color="primary" onClick={goToMiddleReflection}>Next</Button>
          </Grid>
        </Grid>
        <Grid container spacing={2}>
          <Grid item lg={12} md={12} sm={12}>
            <Box m="1rem" align={'center'}>
              <TextTypography>
                You've spoken to <b>{numStakeholderTalkedTo} out of {CONVERSATION_LIMIT}</b> stakeholders</TextTypography>
            </Box>
            <TextTypography variant="body1" align="center">
              {introText}
            </TextTypography>
          </Grid>
          {stakeholdersGrid}
        </Grid>
      </div>
      }
      {!showStakeholders &&
        <Conversation stakeholder={currentStakeholder} showStakeholders={showStakeholders} setShowStakeholders={setShowStakeholders}/>
      }
    </>
  );
}

export default Stakeholders;
