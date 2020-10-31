import React from 'react';
import { Route } from "react-router-dom";
import Results from "./pages/results";
import Home from "./pages/home";
import SimulationWindow from "./pages/simulationWindow";
import RadarTest from "./pages/chartTest";
import CssBaseline from "@material-ui/core/CssBaseline";
import './App.css';

function App() {
  return (
    <>
      <CssBaseline />
      <Route exact path="/" component={Home} />
      <Route exact path="/results" component={Results}/>
      <Route exact path="/simulation" component={SimulationWindow}/>
      <Route exact path="/chartTest" component={RadarTest}/>
    </>
  );
}

export default App;


