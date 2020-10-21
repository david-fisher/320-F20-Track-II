import React, { useState, createContext, useEffect } from "react";
import {Grid} from "@material-ui/core";
import Stepper from "./components/stepper.js";
import InfoGatheredList from "./components/gatheredList.js";
import Results from "./results.js";
import Response from "./response.js";
import Introduction from "./introduction.js";
import ResponseOne from "./responseOne.js";
import ProjectAssignment from "./projectAssignment.js";
import GatheredInformation from "./gatheredInformation.js";
import Stakeholders from "./stakeholders.js";
import Feedback from "./feedback.js";

export const GatheredInfoContext = createContext();

function SimulationWindow() {

  const [activePage, setActivePage] = useState("introduction");
  const [pages, setPages] = useState({
    introduction: {visited: true, completed: true, pageNumber: 1, html: (<Introduction/>)},
    projectAssignment: {visited: false, completed: true, pageNumber: 2, html: (<ProjectAssignment/>)},
    responseOne: {visited: false, completed: false, pageNumber: 3, html: (<ResponseOne/>)},
    gatheredInformation: {visited: false, completed: true, pageNumber: 4, html: (<GatheredInformation/>)},
    stakeholders: {visited: false, completed: true, pageNumber: 5, html: (<Stakeholders/>)},
    results: {visited: false, completed: true, pageNumber: 6, html: (<Results/>)},
    feedback: {visited: false, completed: true, pageNumber: 7, html: (<Feedback/>)},
    response: {visited: false, completed: true, pageNumber: 8, html: (<Response/>)}
  });

  const infoIdsState = useState([]);

  // Asynchronously initialize infoIdsState
  useEffect(() => {
    // placeholder async function until redux is set up
    async function imitateGetCompleteStakeholders() { return [] };// {name: 'Stakeholder 0', id: 's0'}] }

    imitateGetCompleteStakeholders().then(stakeholders => {
      infoIdsState[1](ids => {
        return [
          {name: 'Introduction', pageId: 'introduction', id: 'p0'},
          ...stakeholders.map(stakeholder => {
            stakeholder.pageId = 'stakeholders';
            return stakeholder;
          })
        ];
      });
    });
  }, []) // only fire once

  return (
    <div>
      <Grid container direction="row" justify="center" alignItems="center">
      </Grid>
      <Grid container spacing={2}>
        <GatheredInfoContext.Provider value={infoIdsState}>
          <Grid item lg={3}>
            <Stepper activePage={activePage} pages={pages} key={activePage} />
          </Grid>
          <Grid item lg={6} >
              {React.cloneElement(pages[activePage].html, {
                  pages: pages,
                  setPages: setPages,
                  activePage: activePage,
                  setActivePage: setActivePage})}
          </Grid>
          <Grid item lg={3}>
            <InfoGatheredList pages={pages}/>
          </Grid>
        </GatheredInfoContext.Provider>
      </Grid>
    </div>
  );
}

export default SimulationWindow;
