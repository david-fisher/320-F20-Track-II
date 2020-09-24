import React, { useEffect, useRef, useState } from 'react';
import './App.css';
import Chart from 'chart.js';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


function App() {

  const chartContainer = useRef(null);
  const [chartInstance, setChartInstance] = useState(null);
  // state for input
  const [input, setInput] = useState(0);
  const chartConfig = onChartChange(input)

  useEffect(() => {
    if (chartContainer && chartContainer.current) {
      const newChartInstance = new Chart(chartContainer.current, chartConfig);
      setChartInstance(newChartInstance);
    }
  }, [chartContainer]);

  return (
    <>
    <Container>
      <Row>
        {/* <div className="h-centered"> */}
          <h3 className="h-centered">Coverage Of Issues</h3>
        {/* </div> */}
      </Row>
      <Row>
        <Col>
          <Button variant="light">Back</Button>
        </Col>
        <Col>
          <div className="text-right"><Button variant="primary">Next</Button></div>
        </Col>
      </Row>
      <Row>
        <Col>
          <canvas
            ref={chartContainer}
            id="coverage-plot"
            className="h-centered"
          />
          <div id="coverage-content">
            <p>
              really informative and educational information is what this<br/>
              really informative and educational information is what this<br/>
              really informative and educational information is what this<br/>
              really informative and educational information is what this<br/>
              really informative and educational information is what this<br/>
              really informative and educational information is what this<br/>
              really informative and educational information is what this<br/>
              really informative and educational information is what this<br/>
              really informative and educational information is what this<br/>
              really informative and educational information is what this<br/>
              really informative and educational information is what this<br/>
              really informative and educational information is what this<br/>
            </p>
          </div>
          {/* <form>
            <label>
              Input:
              <input type="text" value={input} onChange={(event) => { setInput(event.target.value) }} />
            </label>

          </form> */}
        </Col>
      </Row>
    </Container>
    
    <div>


    </div>
    </>
  );
}

function colorLimit(value) {
  if (value < 1.5) {
    return "rgba(255, 0, 0, 0.2)"
  }
  else if (value < 2.5) {
    return "rgba(255, 255, 0, 0.2)"
  }
  else {
    return "rgba(0, 128, 0, 0.2)"
  }
}

function onChartChange(input) {
  return {
    type: 'radar',
    data: {
      labels: ["Safety", "Salary", "Reputation", "Privacy"],
      datasets: [{
        label: "Student A",
        backgroundColor: colorLimit(input),
        data: [0.5, 0.667, 1.0, 0.8]
      }]
    },

    options: {
      scale: {
        ticks: {
          beginAtZero: true,
          min: 0,
          display: false
        }
      }
    }
  };
}
export default App;


