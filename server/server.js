const express = require("express");
const bodyParser = require("body-parser");
const passport = require("passport");
const app = express();

const PORT = process.env.PORT || 8080;
require("./config/passport");

app.use(
  bodyParser.urlencoded({
    extended: false,
    limit: "50mb",
    parameterLimit: 50000
  })
);
app.use(body.Parser.json());
app.use(passport.initialize());

app.use("/users", require("./routes/users"));
app.use("/bug_priorities", require("./routes/bug_priorities"));
app.use("/bug_statuses", require("./routes/bug_statuses"));
app.use("/companies", require("./routes/companies"));
app.use("/project_positions", require("./routes/project_positions"));
app.use("/projects", require("./routes/projects"));
app.use("/bugs", require("./routes/bugs"));

app.listen(PORT, () => {
  console.log(`PORT ${PORT} at your service.`)
})

app.get("/", (req, res) => {
  res.send("HI");
})