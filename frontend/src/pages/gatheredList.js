import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { FixedSizeList } from 'react-window';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box'

let showContent = true;

const test = () => {
  console.log("test");
  showContent = !showContent
};

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    height: 400,
    maxWidth: 300,
    backgroundColor: theme.palette.background.paper,
  },
}));

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

  return (
    <div className={classes.root}>
      <Button onClick={test}>Gathered Information</Button>
      {showContent &&
        <Box>
          <FixedSizeList height={400} width={300} itemSize={46} itemCount={6}>
            {renderRow}
          </FixedSizeList>
        </Box>
      }
    </div>
  );
}