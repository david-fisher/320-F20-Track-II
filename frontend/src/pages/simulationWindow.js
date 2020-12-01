import React, { useState, createContext, useEffect, useContext } from "react";
import {Grid, Typography, Box, Button} from "@material-ui/core";
import Stepper from "./components/stepper.js";
import InfoGatheredList from "./components/gatheredList.js";
import Summary from "./summary.js";
import Conclusion from "./conclusion.js";
import Introduction from "./introduction.js";
import ProjectAssignment from "./projectAssignment.js";
import Reflection from "./reflection.js";
import InitialAction from "./initialAction.js";
import GatheredInformation from "./gatheredInformation.js";
import Stakeholders from "./stakeholders.js";
import Feedback from "./feedback.js";
import { ScenariosContext } from "../Nav.js";
import axios from "axios";
import {BASE_URL, STUDENT_ID, DEV_MODE, SCENARIO_ID} from "../constants/config";

export const GatheredInfoContext = createContext();

function SimulationWindow() {

  const [activePage, setActivePage] = useState("introduction");
  const [pages, setPages] = useState({
    introduction: { visited: true, completed: true, pageNumber: 0, html: (<Introduction />) },
    projectAssignment: { visited: false, completed: true, pageNumber: 1, html: (<ProjectAssignment />) },
    initialReflection: { visited: false, completed: true, pageNumber: 2, html: (<Reflection
      content_url="/scenarios/initialReflection" res_url="/scenarios/initialReflection/response" nextPageID="initialAction" prevPageID="projectAssignment" title="Reflect on Initial Information"/>) },
    initialAction: { visited: false, completed: false, pageNumber: 3, html: (<InitialAction />) },
    gatheredInformation: { visited: false, completed: false, pageNumber: 4, html: (<GatheredInformation />) },
    stakeholders: { visited: false, completed: true, pageNumber: 5, html: (<Stakeholders />) },
    middleReflection: { visited: false, completed: true, pageNumber: 6, html: (<Reflection
      content_url="/scenarios/middleReflection" res_url="/scenarios/middleReflection/response"
      nextPageID="summary" prevPageID="stakeholders" title="Reflect on Stakeholder Information"/>) },
    summary: { visited: false, completed: false, pageNumber: 7, html: (<Summary />) },
    feedback: { visited: false, completed: true, pageNumber: 8, html: (<Feedback />) },
    finalReflection: { visited: false, completed: true, pageNumber: 9, html: (<Reflection
      content_url="/scenarios/finalReflection" res_url="/scenarios/finalReflection/response"
      nextPageID="conclusion" prevPageID="feedback" title="Reflect on Final Information"/>) },
    conclusion: { visited: false, completed: false, pageNumber: 10, html: (<Conclusion />) }
  });

  const infoIdsState = useState([]);
  const [scenarios, setScenarios] = useContext(ScenariosContext);

  // Asynchronously initialize infoIdsState and scenarios
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

    if (DEV_MODE) {
      axios({
        method: 'get',
        url: BASE_URL + '/scenarios',
        headers: {
          studentID: STUDENT_ID,
        }
      }).then(response => {
        setScenarios(prev => {
          return {
            scenarioList: response.data,
            currentScenarioID: response.data[0].id
          }
        });
      }).catch(err => {
        console.error(err);
      });
    }
  }, []) // only fire once

  return (
    <div>
      <Grid container direction="row" justify="center" alignItems="center">
      </Grid>
      <Grid container spacing={2}>
        <GatheredInfoContext.Provider value={infoIdsState}>
          <Grid item lg={3} md={2} sm={2}>
            <Stepper activePage={activePage} pages={pages} setPages={setPages} setActivePage={setActivePage} key={activePage} />
          </Grid>
          <Grid item lg={6} md={8} sm={8}>
            <Box mb={6}>
              {React.cloneElement(pages[activePage].html, {
                    pages: pages,
                    setPages: setPages,
                    activePage: activePage,
                    setActivePage: setActivePage})}
            </Box>
            {DEV_MODE && (
              <Typography>
                {"Scenarios:"} <br/>
                {scenarios.scenarioList && scenarios.scenarioList.map(scenario => {
                  return (<>
                    {Object.keys(scenario).map(key => ((<>{key}: {scenario[key]}<br/></>)))}
                    <Button variant="contained" disableElevation
                    onClick={() => setScenarios(scenarios => {
                      let newScenarios = {...scenarios};
                      newScenarios.currentScenarioID = scenario.id;
                      return newScenarios;
                    })}>
                      set as current scenario
                    </Button>
                    <br/> <br/>
                  </>)
                })}
              </Typography>)}
          </Grid>
          <Grid container item lg={3} md={2} sm={2}>
            <Grid item lg={12}>
              <InfoGatheredList pages={pages}/>
            </Grid>
            <Grid item lg={12}>

            </Grid>
          </Grid>
        </GatheredInfoContext.Provider>
      </Grid>
    </div>
  );
}

export default SimulationWindow;
