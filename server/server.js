require("dotenv").config({ path: "../.env" });
const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");

const app = express();
const PORT = process.env.PORT || 8080;

app.use(
  bodyParser.urlencoded({
    extended: false,
    limit: "50mb",
    parameterLimit: 50000
  })
);

// fs.readdirSync(__dirname + '/database/models').forEach(function(filename) {
//   if (~filename.indexOf('.js')) 
//   require(__dirname + '/database/models/' + filename)
//   // console.log(filename.slice(0, -3));
// });

app.listen(PORT, () => {
  console.log(`PORT ${PORT} at your service.`)
})

app.get("/", (req, res) => {
  res.send("HI");
})