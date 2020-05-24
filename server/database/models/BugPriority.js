const { Model } = require('objection');
const knex = require("../knex");

Model.knex(knex);

class BugPriority extends Model {
  static get tableName(){
    return "bug_priorities";
  }
}

module.exports = BugPriority;