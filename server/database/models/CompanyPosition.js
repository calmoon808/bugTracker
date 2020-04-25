const { Model } = require('objection');
const knex = require("../knex");

Model.knex(knex);

class CompanyPositions extends Model {
  static get tableName(){
    return "company_positions";
  }
}

module.exports = CompanyPositions;