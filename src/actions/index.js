const axios = require("axios");

export const actionPostLogin = async data => {
  await axios.post("/users/login", data)
    .then(response => {
      console.log("ACTIONSSSS", data,response);
    })
}