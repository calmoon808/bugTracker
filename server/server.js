const express = require("express");
const bodyParser = require("body-parser");
const passport = require("passport");
const flash = require("connect-flash")
const cookieParser = require("cookie-parser");
const session = require('express-session');
const app = express();
const { withAuth } = require('./middleware');

const PORT = process.env.PORT || 8080;
require("./config/passport");

app.use(
  bodyParser.urlencoded({
    extended: false,
    limit: "50mb",
    parameterLimit: 50000
  })
);
app.use(cookieParser())
app.use(bodyParser.json());
app.use(session({ 
  secret: 'keyboard cat',
  saveUninitialized: true,
  resave: true
 }));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

app.use("/users", require("./routes/users"));
app.use("/bug_priorities", require("./routes/bug_priorities"));
app.use("/bug_statuses", require("./routes/bug_statuses"));
app.use("/companies", require("./routes/companies"));
app.use("/company_positions", require("./routes/company_positions"));
app.use("/projects", require("./routes/projects"));
app.use("/bugs", require("./routes/bugs"));

app.listen(PORT, () => {
  console.log(`PORT ${PORT} at your service.`)
})

app.get("/", (req, res) => {
  // console.log('111111111111111', req);
  res.send(req.isAuthenticated);
})

app.get("/secret", withAuth, function (req, res) {
  res.json('SECRET FOUND');
})