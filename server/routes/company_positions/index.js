const express = require("express");
const companyPositionRouter = express.Router();
const CompanyPosition = require("../../database/models/CompanyPosition")

companyPositionRouter.route("/")
  .get((req, res) => {
    CompanyPosition.query()
      .then(companyPositions => {
        res.json(companyPositions);
      })
  })

module.exports = companyPositionRouter;