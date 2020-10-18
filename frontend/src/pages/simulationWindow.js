import React, { useState } from "react";
import {Grid} from "@material-ui/core";
import Stepper from "./components/stepper.js";
import VirtualizedList from "./components/gatheredList.js";
import Results from "./results.js";
import Response from "./response.js";
import Introduction from "./introduction.js";
import ProjectAssignment from "./projectAssignment.js";
import InitialAction from "./initialAction.js";
import GatheredInformation from "./gatheredInformation.js";
import Stakeholders from "./stakeholders.js";
import Feedback from "./feedback.js";

function SimulationWindow() {

  const [activePage, setActivePage] = useState("introduction");
  const [pages, setPages] = useState({
    introduction: {visited: true, completed: true, pageNumber: 1, html: (<Introduction/>)},
    projectAssignment: {visited: false, completed: true, pageNumber: 2, html: (<ProjectAssignment/>)},
    initialAction: {visited: false, completed: true, pageNumber: 3, html: (<InitialAction/>)},
    gatheredInformation: {visited: false, completed: false, pageNumber: 4, html: (<GatheredInformation/>)},
    stakeholders: {visited: false, completed: true, pageNumber: 5, html: (<Stakeholders/>)},
    results: {visited: false, completed: true, pageNumber: 6, html: (<Results/>)},
    feedback: {visited: false, completed: true, pageNumber: 7, html: (<Feedback/>)},
    response: {visited: false, completed: true, pageNumber: 8, html: (<Response/>)}
  });

  return (
    <div>
      <Grid container direction="row" justify="center" alignItems="center">
      </Grid>
      <Grid container spacing={2}>
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
          <VirtualizedList/>
        </Grid>
      </Grid>
    </div>
  );
}

export default SimulationWindow;
