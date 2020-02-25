const { Model } = require('objection');
const knex = require("../knex");

Model.knex(knex);

class ProjectPositions extends Model {
  static get tableName(){
    return "project_positions";
  }
}

module.exports = ProjectPositions;