export const dashboardGraphOptions = (type, sectionLabels, dataLabel, data, dataColor) => {
  return {
    type: type,
    data: {
      labels: sectionLabels,
      datasets: [
        {
          label: dataLabel,
          data,
          backgroundColor: dataColor
        }
      ]
    }
  }
}