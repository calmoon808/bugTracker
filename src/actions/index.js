const axios = require("axios");
const { dashboardGraphOptions } = require('../graphOptions');
const Chart = require("chart.js");

export async function getChartData(url, data, relation){
  let graphData = [];
  const fixed = await getGroupCount(`/${url}`, "Fixed", data, relation );
  const inProgress = await getGroupCount(`/${url}`, "In-Progress", data, relation );
  const closed = await getGroupCount(`/${url}`, "Closed", data, relation );
  graphData.push(fixed.data.length);
  graphData.push(inProgress.data.length);
  graphData.push(closed.data.length);
  return graphData;
}

export const getGroupCount = (url, group, data, relation) => {
  return axios.post(`${url}/count`, { group, data, relation })
  .then(response => {
    return response;
  })
}

export const graphDoughnutChart = (chartRef, data) => {
  return new Chart(chartRef, dashboardGraphOptions(
    'doughnut', 
    ['Fixed', 'In-Progress', 'Closed'],
    'Bugs',
    data,
    ['green', 'yellow', 'red']
  ))
}

export const validateEmail = (email) => {
  const reg = /\S+@\S+\.\S+/;
  return reg.test(email);
}