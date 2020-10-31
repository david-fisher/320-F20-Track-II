import React, { useState, createContext, useEffect } from "react";
import {Grid} from "@material-ui/core";
import Stepper from "./components/stepper.js";
import InfoGatheredList from "./components/gatheredList.js";
import Results from "./results.js";
import Response from "./response.js";
import Introduction from "./introduction.js";
import ProjectAssignment from "./projectAssignment.js";
import InitialReflection from "./initialReflection.js";
import InitialAction from "./initialAction.js";
import GatheredInformation from "./gatheredInformation.js";
import Stakeholders from "./stakeholders.js";
import MiddleReflection from "./midReflection";
import Feedback from "./feedback.js";
import FinalReflection from "./finalReflection.js"

export const GatheredInfoContext = createContext();

function SimulationWindow() {

  const [activePage, setActivePage] = useState("introduction");
  const [pages, setPages] = useState({
    introduction: { visited: true, completed: true, pageNumber: 0, html: (<Introduction />) },
    projectAssignment: { visited: false, completed: true, pageNumber: 1, html: (<ProjectAssignment />) },
    initialReflection: { visited: false, completed: true, pageNumber: 2, html: (<InitialReflection />) },
    initialAction: { visited: false, completed: false, pageNumber: 3, html: (<InitialAction />) },
    gatheredInformation: { visited: false, completed: false, pageNumber: 4, html: (<GatheredInformation />) },
    stakeholders: { visited: false, completed: true, pageNumber: 5, html: (<Stakeholders />) },
    middleReflection: { visited: false, completed: true, pageNumber: 6, html: (<MiddleReflection />) },
    results: { visited: false, completed: false, pageNumber: 7, html: (<Results />) },
    feedback: { visited: false, completed: true, pageNumber: 8, html: (<Feedback />) },
    finalReflection: { visited: false, completed: true, pageNumber: 9, html: (<FinalReflection />) },
    response: { visited: false, completed: false, pageNumber: 10, html: (<Response />) }
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
            <Stepper activePage={activePage} pages={pages} setPages={setPages} setActivePage={setActivePage} key={activePage} />
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
