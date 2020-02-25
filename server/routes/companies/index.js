const express = require("express");
const companyRouter = express.Router();
const Company = require("../../database/models/Company")

companyRouter.route("/")
  .get((req, res) => {
    Company.query()
      .then(companies => {
        res.json(companies);
      })
  })

module.exports = companyRouter;