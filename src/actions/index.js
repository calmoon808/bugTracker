const axios = require("axios");
const { dashboardGraphOptions } = require("../graphOptions");
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

export const getBugComments = (bugId) => {
  return axios.post("/comments/bug", { bugId })
  .then(response => {
    return response.data;
  })
}

export const getGroupCount = (url, group, data, relation) => {
  return axios.post(`${url}/count`, { group, data, relation })
  .then(response => {
    return response;
  })
}

export const getUserData = (data) => {
  return axios.post("/users/dashboard", data)
  .then(response => {
    return response;
  });
}

export const getUsers = () => {
  return axios.get('/users')
  .then(response => {
    return (response.data);
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

export const postComment = (commentData) => {
  return axios.post('/comments/add', commentData)
}

export const setProjectFeedCookie = (projectId) => {
  return axios.post('projects/setCookie', { projectId })
}

// export const sortComments = (comments) => {
//   const newArr = comments.sort((a, b) => { 
//     return new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
//   });
//   return newArr;
// }

export const timeToMeta = (time) => {
  const today = new Date();
  const date = new Date(time);
  const secondsFromNow = Math.floor((today.getTime() - date.getTime()) / 1000);
  const minutesFromNow = Math.round(secondsFromNow / 60);
  const hoursFromNow = Math.round(minutesFromNow / 60);
  const daysFromNow = Math.round(hoursFromNow / 24);
  const monthsFromNow = Math.round(daysFromNow / 30);
  const yearsFromNow = Math.round(monthsFromNow / 12);

  if (secondsFromNow < 50) return "a few seconds ago";
  if (secondsFromNow < 70) return "a minute ago";
  if (minutesFromNow < 6) return "a couple of minutes ago";
  if (minutesFromNow < 60) return `${minutesFromNow} minutes ago`;
  if (minutesFromNow < 90) return "a hour ago";
  if (hoursFromNow < 24) return `${hoursFromNow} hours ago`;
  if (hoursFromNow < 36) return "a day ago";
  if (daysFromNow < 30) return `${daysFromNow} days ago`;
  if (daysFromNow < 45) return "a month ago";
  if (monthsFromNow < 12) return `${monthsFromNow} months ago`;
  if (monthsFromNow < 18) return "a year ago";
  return `${yearsFromNow} years ago`;
}

export const updateBug = (bugDataObj) => {
  return axios.post("bugs/update/", bugDataObj)
  .then(response => {
    return (response);
  })
}

export const validateEmail = (email) => {
  const reg = /\S+@\S+\.\S+/;
  return reg.test(email);
}