import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import {Grid} from '@material-ui/core';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles({
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
});

export default function SwipeableTemporaryDrawer({stepper, gatheredInformation}) {
  const classes = useStyles();
  const [state, setState] = React.useState({
    left: false,
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const listLeft = (anchor) => (
    <div
    className={clsx(classes.list, {
      [classes.fullList]: anchor === 'top' || anchor === 'bottom',
    })}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      {stepper}
    </div>
  );

  const listRight = (anchor) => (
    <div
    className={clsx(classes.list, {
      [classes.fullList]: anchor === 'top' || anchor === 'bottom',
    })}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      {gatheredInformation}
    </div>
  );

  return (
    <div>
      <Grid container direction="row" justify="space-between">
          <Grid item style={{ marginRight: "0rem"}}>
            <Button variant="contained" onClick={toggleDrawer('Left', true)}>Stepper</Button>
            <SwipeableDrawer
            anchor={'Left'}
            open={state['Left']}
            onClose={toggleDrawer('Left', false)}
            onOpen={toggleDrawer('Left', true)}
          >
            {listLeft('Left')}
          </SwipeableDrawer>
          </Grid>
          <Grid item style={{ marginRight: "0rem"}}>
            <Button variant="contained" onClick={toggleDrawer('Right', true)}>Gathered Information</Button>
            <SwipeableDrawer
            anchor={'Right'}
            open={state['Right']}
            onClose={toggleDrawer('Right', false)}
            onOpen={toggleDrawer('Right', true)}
          >
            {listRight('Right')}
          </SwipeableDrawer>
          </Grid>
      </Grid>
    </div>
  );
}
