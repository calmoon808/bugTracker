const { Model } = require('objection');
const knex = require("../knex");

Model.knex(knex);

class Comment extends Model {
  static get tableName(){
    return "comments";
  }

  static get relationMappings(){
    const User = require('./User');

    return {
      poster: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: 'comments.poster_id',
          to: 'users.id'
        }
      }
    }
  }
}

module.exports = Comment;