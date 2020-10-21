import React, { useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { makeStyles, List, ListItem, ListItemText, Button, Box } from '@material-ui/core';
import { GatheredInfoContext } from '../simulationWindow';
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

export default function InfoGatheredList({pages}) {
  const classes = useStyles();

  const [showList, setShowContent] = React.useState(true);
  const toggleShow = () => {
    setShowContent(show => !show);
  };

  let listContentById = {};
  let [infos, setInfos] = useContext(GatheredInfoContext);

  async function getListContent(info) {
    if (listContentById[info.id] === undefined) {
      const mockHttpRequest = async () => { // Simulating async retrieval of data
        switch (info.id) {
          case 's0':
          case 's1':
            return 'Stakeholder';
          case 'p0':
            return `A good place to start on this course is to look at the reasons why we should study it at all. To facilitate this, we look at a few scenarios. For each of these scenarios, you should write think about any questionable ethical issues about each scenario. At his point you may not be to answer them, but you might have your own opinion. Write this down as well you should revisit them after relevant section and see if your opinion has been affected. Hopefully these typical ethical questions illustrates to you the diverse characters of ethical issues including, property rights, privacy, free speech and professional ethics. Is computer ethics different to those that came before. Partially, the answer is no since all fields have similar problems and issue. Partially, the answer is also yes, since there are issuesspecific to computerssuch asspeed and programs etc. \n\n A good place to start on this course is to look at the reasons why we should study it at all. To facilitate this, we look at a few scenarios. For each of these scenarios, you should write think about any questionable ethical issues about each scenario. At his point you may not be to answer them, but you might have your own opinion. Write this down as well you should revisit them after relevant section and see if your opinion has been affected. Hopefully these typical ethical questions illustrates to you the diverse characters of ethical issues including, property rights, privacy, free speech and professional ethics. Is computer ethics different to those that came before. Partially, the answer is no since all fields have similar problems and issue. Partially, the answer is also yes, since there are issuesspecific to computerssuch asspeed and programs etc.\n\nA good place to start on this course is to look at the reasons why we should study it at all. To facilitate this, we look at a few scenarios. For each of these scenarios, you should write think about any questionable ethical issues about each scenario. At his point you may not be to answer them, but you might have your own opinion. Write this down as well you should revisit them after relevant section and see if your opinion has been affected. Hopefully these typical ethical questions illustrates to you the diverse characters of ethical issues including, property rights, privacy, free speech and professional ethics. Is computer ethics different to those that came before. Partially, the answer is no since all fields have similar problems and issue. Partially, the answer is also yes, since there are issuesspecific to computerssuch asspeed and programs etc. \n\n A good place to start on this course is to look at the reasons why we should study it at all. To facilitate this, we look at a few scenarios. For each of these scenarios, you should write think about any questionable ethical issues about each scenario. At his point you may not be to answer them, but you might have your own opinion. Write this down as well you should revisit them after relevant section and see if your opinion has been affected. Hopefully these typical ethical questions illustrates to you the diverse characters of ethical issues including, property rights, privacy, free speech and professional ethics. Is computer ethics different to those that came before. Partially, the answer is no since all fields have similar problems and issue. Partially, the answer is also yes, since there are issuesspecific to computerssuch asspeed and programs etc.\n\nA good place to start on this course is to look at the reasons why we should study it at all. To facilitate this, we look at a few scenarios. For each of these scenarios, you should write think about any questionable ethical issues about each scenario. At his point you may not be to answer them, but you might have your own opinion. Write this down as well you should revisit them after relevant section and see if your opinion has been affected. Hopefully these typical ethical questions illustrates to you the diverse characters of ethical issues including, property rights, privacy, free speech and professional ethics. Is computer ethics different to those that came before. Partially, the answer is no since all fields have similar problems and issue. Partially, the answer is also yes, since there are issuesspecific to computerssuch asspeed and programs etc. \n\n A good place to start on this course is to look at the reasons why we should study it at all. To facilitate this, we look at a few scenarios. For each of these scenarios, you should write think about any questionable ethical issues about each scenario. At his point you may not be to answer them, but you might have your own opinion. Write this down as well you should revisit them after relevant section and see if your opinion has been affected. Hopefully these typical ethical questions illustrates to you the diverse characters of ethical issues including, property rights, privacy, free speech and professional ethics. Is computer ethics different to those that came before. Partially, the answer is no since all fields have similar problems and issue. Partially, the answer is also yes, since there are issuesspecific to computerssuch asspeed and programs etc.`;
          default:
            return 'default';
        }
      }
      return mockHttpRequest()
        .then(res => {
          listContentById[info.id] = res;
          return res;
        });
    } else {
      return listContentById[info.id];
    }
  }

  return (
    <div className={classes.root}>
      <Box mt = {6} ml = {8}>
        <Button onClick={toggleShow} 
         color = "primary"
         style = {{ fontSize: '16px'}}
         disableRipple = "true"
         >
         Gathered Information
         </Button>
      {showList &&
        <List>
          {infos.filter(info => pages[info.pageId].visited).map(info => {
            return (
              <ListItem key={info.id} button onClick={() => getListContent(info).then(res => alert(res))}>
                <ListItemText height={400} width={300}>
                  {info.name}
                </ListItemText>
              </ListItem>
            );
          })}
        </List>
      }
     </Box> 
    </div>
  );
}