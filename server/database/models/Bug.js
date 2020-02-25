const { Model } = require('objection');
const knex = require("../knex");

Model.knex(knex);

class Bug extends Model {
  static get tableName(){
    return "bugs";
  }
}

module.exports = Bug;