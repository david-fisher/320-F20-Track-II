import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {Grid} from "@material-ui/core";
import Stepper from "./components/stepper.js";
import VirtualizedList from "./components/gatheredList.js";
import Results from "./results.js";
import Response from "./response.js";
import Introduction from "./introduction.js";
import ResponseOne from "./responseOne.js";
import ProjectAssignment from "./projectAssignment.js";
import GatheredInformation from "./gatheredInformation.js";
import Stakeholders from "./stakeholders.js";
import Feedback from "./feedback.js";

function SimulationWindow() {

  const [activePage, setActivePage] = useState("introduction");
  const [pages, setPages] = useState({
    introduction: {visited: true, pageNumber: 1, html: (<Introduction/>)},
    projectAssignment: {visited: false, pageNumber: 2, html: (<ProjectAssignment/>)},
    responseOne: {visited: false, pageNumber: 3, html: (<ResponseOne/>)},
    gatheredInformation: {visited: false, pageNumber: 4, html: (<GatheredInformation/>)},
    stakeholders: {visited: false, pageNumber: 5, html: (<Stakeholders/>)},
    results: {visited: false, pageNumber: 6, html: (<Results/>)},
    feedback: {visited: false, pageNumber: 7, html: (<Feedback/>)},
    response: {visited: false, pageNumber: 8, html: (<Response/>)}
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
