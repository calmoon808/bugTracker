import React, { useEffect } from 'react';
import { Card } from 'semantic-ui-react';
import Chart from "chart.js";

const OverviewGraph = (props) => {
  let chartRef = React.createRef();
  useEffect(() => {
    const myChartRef = chartRef.current.getContext("2d");
    new Chart(myChartRef, {
      type: "doughnut",
      data: {
        labels: ["Open", "Closed"],
        datasets: [
          {
            label: "Bugs",
            data: [2, 8],
            backgroundColor: ['green', 'red']
          }
        ]
      },
      options: {
        // hover: {
        //   // Overrides the global setting
        //   mode: 'index'
        // }
        animation: {
          animateRotate: true
        }
      }
    })
  })

  return (
    <Card>
      <Card.Content>
        <Card.Header>My Overview</Card.Header>
      </Card.Content>
      <Card.Content>
        <canvas 
          id="myChart"
          ref={chartRef}  
        />
      </Card.Content>
    </Card>
  );
}

export default OverviewGraph;