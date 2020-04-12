export const dashboardGraphOptions = {
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
  }
}