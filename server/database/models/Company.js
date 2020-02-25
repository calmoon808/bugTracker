const { Model } = require('objection');
const knex = require("../knex");

Model.knex(knex);

class Company extends Model {
  static get tableName(){
    return "companies";
  }
}

module.exports = Company;