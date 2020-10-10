import React from "react";

import Results from "./pages/results";
import App from "./App";
import RadarTest from "./pages/chartTest";
import SimulationWindow from "./pages/simulationWindow";

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";





function Router() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Router>
          {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
          <Switch>
            <Route path="/" exact>
              <App />
            </Route>
            <Route path="/results" exact>
              <Results />
            </Route>
            <Route path="/simulation" exact>
              <SimulationWindow/>
            </Route>
            <Route path="/chartTest" exact>
              <RadarTest />
            </Route>
          </Switch>
      </Router>
    </div>
  );
}

export default Router;