import React, { useState } from 'react';
import {Button, Grid} from '@material-ui/core';
import Radar from './chart/chart';


function RadarTest(props) {

    const [input, setInput] = useState(0);
    const [testInput1, settestInput1] = useState(0);
    const [testInput2, settestInput2] = useState(0);
    const [testInput3, settestInput3] = useState(0);


    const scenario_scoring_matrix = {
        Tim: {
            issue1: 1,
            issue2: 4,
            issue3: 2
        },
        Song: {
            issue1: 0,
            issue2: 2,
            issue3: 3
        }

    };

    const Total_Emphasis = {};
    for (let conversant in scenario_scoring_matrix) {
        for (let issue in scenario_scoring_matrix[conversant]) {
            Total_Emphasis[issue] = (Total_Emphasis[issue] === undefined) ? scenario_scoring_matrix[conversant][issue] : scenario_scoring_matrix[conversant][issue] + Total_Emphasis[issue]
        }
    }
    // a perfect student
    let Student_Emphasis = {};
    if (testInput1 === 0 && testInput2 === 0 && testInput3 === 0) {
        for (let conversant in scenario_scoring_matrix) {
            for (let issue in scenario_scoring_matrix[conversant]) {
                Student_Emphasis[issue] = (Student_Emphasis[issue] === undefined) ? scenario_scoring_matrix[conversant][issue] : scenario_scoring_matrix[conversant][issue] + Student_Emphasis[issue]
            }
        }
    } else {

        Student_Emphasis = {
            issue1: testInput1,
            issue2: testInput2,
            issue3: testInput3,
        }
    }

    const Coverage = {};
    for (let issue in Total_Emphasis) {
        Coverage[issue] = Student_Emphasis[issue] / Total_Emphasis[issue];
    }
    const Ethcical_Importance = {
        issue1: 0.5,
        issue2: 0.9,
        issue3: 0.8
    }

    let Summary_Value = 0;
    for (let issue in Total_Emphasis) {
        Summary_Value += Ethcical_Importance[issue] * Coverage[issue];
    }


    return (
        <div>
            <Grid container>
                <Grid container direction="row" justify="center">
                    <h3 >Coverage Of Issues</h3>
                </Grid>
                <Grid container direction="row" justify="space-around">
                    <Button variant="contained" disableElevation onClick={(e) => {
                        e.preventDefault();
                        setInput(input + 1);

                    }}>Back</Button>
                    <Button variant="contained" color="primary" disableElevation>Next</Button>
                </Grid>
                <Grid container direction="row" justify="center">
                    <Radar key={testInput1 + testInput2 + testInput3 + ''} coverage={Coverage} summary={Summary_Value} />
                </Grid>
                <br />
                {/* { <form> */}
                <label>
                    Student Issue 1:
              <input type="text" value={testInput1} onChange={(event) => { settestInput1(event.target.value); }} />
                </label>
                <label>
                    Student Issue 2:
              <input type="text" value={testInput2} onChange={(event) => { settestInput2(event.target.value); }} />
                </label>
                <label>
                    Student Issue 3:
              <input type="text" value={testInput3} onChange={(event) => { settestInput3(event.target.value); }} />
                </label>

                {/* </form> } */}

            </Grid>
        </div>
    );
}


export default RadarTest;
