const { Model } = require('objection');
const knex = require("../knex");

Model.knex(knex);

class ProjectStatuses extends Model {
  static get tableName(){
    return "project_statuses";
  }
}

module.exports = ProjectStatuses;