import React, { useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { makeStyles, List, ListItem, ListItemText, Button, Box, Typography} from '@material-ui/core';
import { GatheredInfoContext } from '../simulationWindow';
import PersonIcon from '@material-ui/icons/Person';
import InfoModal from './infoModal'

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    height: 400,
    maxWidth: 300,
    backgroundColor: theme.palette.background.paper,
    color: "#5b7f95"
  }
}));


export default function InfoGatheredList({pages}) {
  const classes = useStyles();

  const [showList, setShowContent] = React.useState(true);
  const toggleShow = () => {
    setShowContent(show => !show);
  };

  // const modalTitle = "Introduction";
  // const inputText = "Some Text 123";

  let listContentById = {};
  let [infos, setInfos] = useContext(GatheredInfoContext);

  /*  Retrieve the content to display for a given info button.
      If the info button onClick triggers an alert, this should be a string. If it's a modal popup, it should be html.
  */
  async function getListContent(info) {
    if (listContentById[info.id] === undefined) {
      const mockHttpRequest = async () => { // Simulating async retrieval of data
        switch (info.id) {
          case 'p0':
            return (<Typography>A good place to start on this course is to look at the reasons why we should study it at all. To facilitate this, we look at a few scenarios. For each of these scenarios, you should write think about any questionable ethical issues about each scenario. At his point you may not be to answer them, but you might have your own opinion. Write this down as well you should revisit them after relevant section and see if your opinion has been affected. Hopefully these typical ethical questions illustrates to you the diverse characters of ethical issues including, property rights, privacy, free speech and professional ethics. Is computer ethics different to those that came before. Partially, the answer is no since all fields have similar problems and issue. Partially, the answer is also yes, since there are issuesspecific to computerssuch asspeed and programs etc. \n\n A good place to start on this course is to look at the reasons why we should study it at all. To facilitate this, we look at a few scenarios. For each of these scenarios, you should write think about any questionable ethical issues about each scenario. At his point you may not be to answer them, but you might have your own opinion. Write this down as well you should revisit them after relevant section and see if your opinion has been affected. Hopefully these typical ethical questions illustrates to you the diverse characters of ethical issues including, property rights, privacy, free speech and professional ethics. Is computer ethics different to those that came before. Partially, the answer is no since all fields have similar problems and issue. Partially, the answer is also yes, since there are issuesspecific to computerssuch asspeed and programs etc.\n\nA good place to start on this course is to look at the reasons why we should study it at all. To facilitate this, we look at a few scenarios. For each of these scenarios, you should write think about any questionable ethical issues about each scenario. At his point you may not be to answer them, but you might have your own opinion. Write this down as well you should revisit them after relevant section and see if your opinion has been affected. Hopefully these typical ethical questions illustrates to you the diverse characters of ethical issues including, property rights, privacy, free speech and professional ethics. Is computer ethics different to those that came before. Partially, the answer is no since all fields have similar problems and issue. Partially, the answer is also yes, since there are issuesspecific to computerssuch asspeed and programs etc. \n\n A good place to start on this course is to look at the reasons why we should study it at all. To facilitate this, we look at a few scenarios. For each of these scenarios, you should write think about any questionable ethical issues about each scenario. At his point you may not be to answer them, but you might have your own opinion. Write this down as well you should revisit them after relevant section and see if your opinion has been affected. Hopefully these typical ethical questions illustrates to you the diverse characters of ethical issues including, property rights, privacy, free speech and professional ethics. Is computer ethics different to those that came before. Partially, the answer is no since all fields have similar problems and issue. Partially, the answer is also yes, since there are issuesspecific to computerssuch asspeed and programs etc.\n\nA good place to start on this course is to look at the reasons why we should study it at all. To facilitate this, we look at a few scenarios. For each of these scenarios, you should write think about any questionable ethical issues about each scenario. At his point you may not be to answer them, but you might have your own opinion. Write this down as well you should revisit them after relevant section and see if your opinion has been affected. Hopefully these typical ethical questions illustrates to you the diverse characters of ethical issues including, property rights, privacy, free speech and professional ethics. Is computer ethics different to those that came before. Partially, the answer is no since all fields have similar problems and issue. Partially, the answer is also yes, since there are issuesspecific to computerssuch asspeed and programs etc. \n\n A good place to start on this course is to look at the reasons why we should study it at all. To facilitate this, we look at a few scenarios. For each of these scenarios, you should write think about any questionable ethical issues about each scenario. At his point you may not be to answer them, but you might have your own opinion. Write this down as well you should revisit them after relevant section and see if your opinion has been affected. Hopefully these typical ethical questions illustrates to you the diverse characters of ethical issues including, property rights, privacy, free speech and professional ethics. Is computer ethics different to those that came before. Partially, the answer is no since all fields have similar problems and issue. Partially, the answer is also yes, since there are issuesspecific to computerssuch asspeed and programs etc.`</Typography>);
          default:
            if (info.id.startsWith('stakeholder:')) {
              return (<Typography>a cool stakeholder</Typography>);
            }
            return (<Typography>default</Typography>);
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

  //changing variables as per screensize
  const [height, width] = useWindowSize();
  const isSmall = width < 640;
  const isMedium = width < 1024; //could also be 1007 instead of 1024 depending on standard used
  const margin_left = isSmall? 1 : (isMedium ? 2 : 8);
  const title_fontSize = isSmall? '8px' : (isMedium ? '12px' : '16px'); //use it later when making it suitable for medium and small sizes

  return (
    <div className={classes.root}>
      <Box mt = {6} ml = {'20%'}>
        <Button onClick={toggleShow} 
         color = "primary"
         style = {{ fontSize: '16px'}}
         disableRipple = "true"
         >
         Gathered Information
         </Button>
        {showList &&
          <List>
            {/* {infos.filter(info => pages[info.pageId].visited).map(info => {
              return (
                <ListItem key={info.id} button onClick={() => getListContent(info).then(res => alert(res))}>
                  {(info.pageId === 'stakeholders') &&
                    <Box mr = {1} mb = {0.75}>
                      <PersonIcon style = {{ color: "#373a3c"}}/>
                    </Box>
                  }
                  <ListItemText height={400} width={300}>
                    {info.name}
                  </ListItemText>
                </ListItem>
              );
            })} */}
            {infos.filter(info => pages[info.pageId].visited).map(info => {
              return (
                <ListItem key={info.id}>
                  <InfoModal getContent={getListContent} info={info}/>
                </ListItem>
              );
            })}
          {/* <ListItem>
            <InfoModal inputText={inputText} modalTitle={modalTitle}/>
          </ListItem> */}
          </List> 
        }
     </Box> 
    </div>
  );
}

function useWindowSize(){
  const [size, setSize] = useState([window.innerHeight, window.innerWidth]);
  useEffect(()=> {
    const handleResize = () =>{
      setSize([window.innerHeight, window.innerWidth]);
    };
    window.addEventListener("resize", handleResize);
    return ()=>{
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return size;
}