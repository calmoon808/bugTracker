const { Model } = require('objection');
const knex = require("../knex");

Model.knex(knex);

class UsersBugs extends Model {
  static get tableName(){
    return "users_bugs";
  }
}

module.exports = UsersBugs;