const axios = require("axios");

export const validateEmail = (email) => {
  const reg = /\S+@\S+\.\S+/;
  return reg.test(email);
}

export const getGroupCount = (url, group, data) => {
  return axios.post(`${url}/count`, { group, data: JSON.parse(data) })
  .then(response => {
    return response;
  })
}