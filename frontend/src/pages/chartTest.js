import React, { useState } from "react";
import { Button, Grid } from "@material-ui/core";
import Radar from "./chart/chart";

function RadarTest(props) {
  const [input, setInput] = useState(0);
  const [testInput1, setTestInput1] = useState(0);
  const [testInput2, setTestInput2] = useState(0);
  const [testInput3, setTestInput3] = useState(0);

  const scenario_scoring_matrix = {
    Tim: {
      issue1: 1,
      issue2: 4,
      issue3: 2,
    },
    Song: {
      issue1: 0,
      issue2: 2,
      issue3: 3,
    },
  };
  function Total_EmphasisF(scenario_scoring_matrix) {
    const Total_Emphasis = {};
    for (let conversant in scenario_scoring_matrix) {
      for (let issue in scenario_scoring_matrix[conversant]) {
        Total_Emphasis[issue] =
          Total_Emphasis[issue] === undefined
            ? scenario_scoring_matrix[conversant][issue]
            : scenario_scoring_matrix[conversant][issue] +
              Total_Emphasis[issue];
      }
      return Total_Emphasis;
    }
  }
  const Total_Emphasis = Total_EmphasisF(scenario_scoring_matrix);
  // a perfect student

  function Student_EmphasisF(scenario_scoring_matrix) {
    let Student_Emphasis = {};
    if (testInput1 === 0 && testInput2 === 0 && testInput3 === 0) {
      for (let conversant in scenario_scoring_matrix) {
        for (let issue in scenario_scoring_matrix[conversant]) {
          Student_Emphasis[issue] =
            Student_Emphasis[issue] === undefined
              ? scenario_scoring_matrix[conversant][issue]
              : scenario_scoring_matrix[conversant][issue] +
                Student_Emphasis[issue];
        }
      }
    } else {
      Student_Emphasis = {
        issue1: testInput1,
        issue2: testInput2,
        issue3: testInput3,
      };
    }
    return Student_Emphasis;
  }
  let Student_Emphasis = Student_EmphasisF(scenario_scoring_matrix);

  function CoverageF(Total_Emphasis, Student_Emphasis) {
    const Coverage = {};
    for (let issue in Total_Emphasis) {
      Coverage[issue] = Student_Emphasis[issue] / Total_Emphasis[issue];
    }
    return Coverage;
  }
  let Coverage = CoverageF(Total_Emphasis, Student_Emphasis);
  const Ethcical_Importance = {
    issue1: 0.5,
    issue2: 0.9,
    issue3: 0.8,
  };

  function Summary_ValueF(Total_Emphasis, Ethcical_Importance, Coverage) {
    let Summary_Value = 0;
    for (let issue in Total_Emphasis) {
      Summary_Value += Ethcical_Importance[issue] * Coverage[issue];
    }
    return Summary_Value;
  }

  let Summary_Value = Summary_ValueF(
    Total_Emphasis,
    Ethcical_Importance,
    Coverage
  );

  return (
    <div>
      <Grid container>
        <Grid container direction="row" justify="center">
          <h3>Coverage Of Issues</h3>
        </Grid>
        <Grid container direction="row" justify="space-around">
          <Button
            variant="contained"
            disableElevation
            onClick={(e) => {
              e.preventDefault();
              setInput(input + 1);
            }}
          >
            Back
          </Button>
          <Button variant="contained" color="primary" disableElevation>
            Next
          </Button>
        </Grid>
        <Grid container direction="row" justify="center">
          <Radar
            key={testInput1 + testInput2 + testInput3 + ""}
            coverage={Coverage}
            summary={Summary_Value}
          />
        </Grid>
        <br />
        {/* { <form> */}
        <label>
          Student Issue 1:
          <input
            type="text"
            value={testInput1}
            onChange={(event) => {
              setTestInput1(event.target.value);
            }}
          />
        </label>
        <label>
          Student Issue 2:
          <input
            type="text"
            value={testInput2}
            onChange={(event) => {
              setTestInput2(event.target.value);
            }}
          />
        </label>
        <label>
          Student Issue 3:
          <input
            type="text"
            value={testInput3}
            onChange={(event) => {
              setTestInput3(event.target.value);
            }}
          />
        </label>

        {/* </form> } */}
      </Grid>
    </div>
  );
}

export default RadarTest;
