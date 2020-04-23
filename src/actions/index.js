const axios = require("axios");

export const getGroupCount = (url, group, data) => {
  return axios.post(`${url}/count`, { group, data })
  .then(response => {
    return response;
  })
}

export const validateEmail = (email) => {
  const reg = /\S+@\S+\.\S+/;
  return reg.test(email);
}