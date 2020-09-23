import React, { useEffect, useRef, useState } from 'react';
import './App.css';
import Chart from 'chart.js';

// const value = 1.6
// const chartConfig = {
//   type: 'radar',
//   data: {
//     labels: ["Safety", "Privacy", "Reputation", "Salary"],
//     datasets: [{
//       label: "Student A",
//       backgroundColor: colorLimit(value),
//       data: [65, 75, 70, 80]
//     }]
//   },

//   options: {
//     scale: {
//       ticks: {
//         beginAtZero: true,
//         min: 0
//       }
//     }
//   }
// };


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
    <div>
      <canvas
        ref={chartContainer}
      />
      <form>
        <label>
          Input:
          <input type="text" value={input} onChange={(event) => { setInput(event.target.value) }} />
        </label>

      </form>

    </div>
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
      labels: ["Safety", "Privacy", "Reputation", "Salary"],
      datasets: [{
        label: "Student A",
        backgroundColor: colorLimit(input),
        data: [65, 75, 70, 80]
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


