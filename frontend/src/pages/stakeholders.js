import React, { useContext } from "react";
import { makeStyles, withStyles, Typography, Box, Grid, Button,
  Card, CardContent, Modal, Dialog, DialogContent, DialogContentText } from "@material-ui/core";
import { GatheredInfoContext } from './simulationWindow';

const TextTypography = withStyles({
  root: {
    color: "#373a3c"
  }
})(Typography);

const cardStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  title: {
    fontSize: 14,
  }
});

const introText = "Please select the Stakeholder you would like to interact with...";
const stakeholders = [
  { name: 'a', description: 'I am stakeholder a' , id: 0, background: 'really cool background for stakeholder A this is not placeholder data'},
  { name: 'b', description: 'I am stakeholder b' , id: 1, background: 'really cool background for stakeholder B this is not placeholder data'},
  { name: 'c', description: 'I am stakeholder c' , id: 2, background: 'really cool background for stakeholder C this is not placeholder data'},
  { name: 'd', description: 'I am stakeholder d' , id: 3, background: 'really cool background for stakeholder D this is not placeholder data'},
  { name: 'e', description: 'I am stakeholder e' , id: 4, background: 'really cool background for stakeholder E this is not placeholder data'},
  { name: 'f', description: 'I am stakeholder f' , id: 5, background: 'really cool background for stakeholder F this is not placeholder data'},
  { name: 'g', description: 'I am stakeholder g' , id: 6, background: 'really cool background for stakeholder G this is not placeholder data'},
  { name: 'h', description: 'I am stakeholder h' , id: 7, background: 'really cool background for stakeholder H this is not placeholder data'}
  ];

function Stakeholders({ pages, setPages, activePage, setActivePage }) {

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
        <Button onClick={() => setModalOpenToggles(prev => {
          let newToggles = {...prev};
          newToggles[id] = true;
          return newToggles;
        })}>
          <Card className={card.root}>
            <CardContent>
              <Typography variant="h5" component="h2">
                {name}
              </Typography>
              <Typography variant="body2" component="p">
                {description}
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
            <DialogContentText>{background}</DialogContentText>
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
