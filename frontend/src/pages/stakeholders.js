import React, { useContext } from "react";
import { makeStyles, withStyles, Typography, Box, Grid, Button,
  Card, CardContent, Modal, Dialog, DialogContent, DialogContentText } from "@material-ui/core";
import { useTheme } from "@material-ui/core/styles";
import { GatheredInfoContext } from './simulationWindow';

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
    }
  });

  const [modalOpenToggles, setModalOpenToggles] = React.useState(
    stakeholders.reduce((obj, stakeholder) => {
      obj[stakeholder.id] = false;
      return obj;
    }, {})
  );
  const [gatheredInfo, setGatheredInfo] = useContext(GatheredInfoContext);
  const stakeholdersGrid = getStakeholdersGrid(stakeholders);

  function getStakeholderCards(id, name, description, background) {
    const card = cardStyles();
    return (
      <>
        <Button  style={{textTransform: 'none'}} onClick={() => setModalOpenToggles(prev => {
          let newToggles = {...prev};
          newToggles[id] = true;
          return newToggles;
        })}>
          <Card className={card.root}>
            <CardContent>
              <Typography variant="h5" component="h2" align='left' className={card.name}>
                {name}
              </Typography>
              <Typography variant="body1" component="p" align='left'>
                {description}
              </Typography>
              <Typography variant="body2" component="p" align='left' className={card.background}>
                {ellipses(background, 87)}
              </Typography>
            </CardContent>
          </Card>
        </Button>
        <Dialog
          open={modalOpenToggles[id]}
          onClose={() => setModalOpenToggles(prev => {
            let newToggles = {...prev};
            newToggles[id] = false;
            return newToggles;
          })}
          maxWidth = {'md'}
          >
          <DialogContent>
            <DialogContentText color = "#000000">{background}</DialogContentText>
            <Button variant="contained">Continue</Button>
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
      const PAGE_ID_OF_PAGE_BEFORE_CONVERSATIONS = 'gatheredInformation' // TODO: 'gatheredInformation' is the wrong answer here!
      setGatheredInfo(infos => {
        let ind = infos.findIndex(info => info.pageId === PAGE_ID_OF_PAGE_BEFORE_CONVERSATIONS);
        if (ind < 0) { ind = infos.length; }
        let newInfos = [...infos];
        newInfos.splice(ind, 0,
          { name: 'Stakeholder 0', id: 's0', pageId: 'stakeholders' },
          { name: 'Stakeholder 1', id: 's1', pageId: 'stakeholders' }); // placeholder stakeholder values
        return newInfos;
      });
    }
    setActivePage(prevPage => 'middleReflection')
  }
  return (
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
              You've spoken to <b>{'{arbitrary number}'} out of {stakeholders.length}</b> stakeholders</TextTypography>
          </Box>
          <TextTypography variant="body1" align="center">
            {introText}
          </TextTypography>
        </Grid>
        {stakeholdersGrid}
      </Grid>
    </div>
  );
}

export default Stakeholders;
