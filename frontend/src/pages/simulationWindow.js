import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Grid from "@material-ui/core/grid";
import Stepper from "./stepper.js";
import VirtualizedList from "./gatheredList.js";
import Results from "./results";
import Response from "./response";

function SimulationWindow() {

  const [activePage, setActivePage] = useState("results");
  const [pages, setPages] = useState({
    results: {visited: false, html: (<Results/>)},
    response: {visited: false, html: (<Response/>)}
  });

  return (
    <div>
      <Grid container direction="row" justify="center" alignItems="center">
      </Grid>
      <Grid container spacing={2}>
        <Grid item lg={3}>
          <Stepper activePage={activePage} pages={pages} key={activePage} />
        </Grid>
        <Grid item lg={6}>
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
