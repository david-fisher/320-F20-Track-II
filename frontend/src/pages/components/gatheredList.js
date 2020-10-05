import React from 'react';
import PropTypes from 'prop-types';
import { ThemeProvider, createMuiTheme, makeStyles, 
          List, ListItem, ListItemText, Button, Box } 
from '@material-ui/core';
import PersonIcon from '@material-ui/icons/Person';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    height: 400,
    maxWidth: 300,
    backgroundColor: theme.palette.background.paper,
    color: "#5b7f95"
  },
}));

const colorChange = createMuiTheme({
  palette:{
    primary:{
      main : "#373a3c"
    },
  }
});

function renderRow(props) {
  const { index, style } = props;

  return (
    <ListItem button style={style} key={index}>
      <ListItemText primary={`Stakeholder ${index + 1}`} />
    </ListItem>
  );
}

renderRow.propTypes = {
  index: PropTypes.number.isRequired,
  style: PropTypes.object.isRequired,
};

export default function VirtualizedList() {
  const classes = useStyles();

  let [showList, setShowContent] = React.useState(true);

  const toggleShow = () => {
    setShowContent(show => !show)
  };

  return (
    <div className={classes.root}>
      <Box mt = {6} ml = {8}>
      <ThemeProvider theme = {colorChange}>
        <Button onClick={toggleShow} 
         color = "primary"
         style = {{ fontSize: '16px'}}
         disableRipple = "true"
         >
         Gathered Information
         </Button>
      </ThemeProvider>
      {showList &&
        <List>
          <ListItem button>
          <Box mr = {1} mb = {0.75}>
            <PersonIcon style = {{ color: "#373a3c"}}/>
          </Box>
            <ListItemText height={400} width={300}>
              StakeHolder 1
          </ListItemText>
          </ListItem>

          <ListItem button>
          <Box mr = {1} mb = {0.75}>
            <PersonIcon style = {{ color: "#373a3c"}}/>
          </Box>
            <ListItemText height={400} width={300}>
              StakeHolder 2
          </ListItemText>
          </ListItem>
        </List>
      }
     </Box> 
    </div>
  );
}