const { Model } = require('objection');
const knex = require("../knex");

Model.knex(knex);

class BugStatuses extends Model {
  static get tableName(){
    return "bug_statuses";
  }
}

module.exports = BugStatuses;