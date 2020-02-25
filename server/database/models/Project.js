const { Model } = require('objection');
const knex = require("../knex");

Model.knex(knex);

class Project extends Model {
  static get tableName(){
    return "projects";
  }
}

module.exports = Project;