const { Model } = require('objection');
const knex = require("../knex");

Model.knex(knex);

class Bug extends Model {
  static get tableName(){
    return "bugs";
  }

  static get relationMappings(){
    const User = require('./User');
    const Project = require('./Project');
    const BugStatus = require('./BugStatus');
    const BugPriority = require('./BugPriority');
    const Comment = require('./Comment');

    return {
      poster: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: 'bugs.poster_id',
          to: 'users.id'
        }
      },
      project: {
        relation: Model.BelongsToOneRelation,
        modelClass: Project,
        join: {
          from: 'bugs.project_id',
          to: 'projects.id'
        }
      },
      bug_status: {
        relation: Model.HasOneRelation,
        modelClass: BugStatus,
        join: {
          from: 'bugs.bug_status_id',
          to: 'bug_statuses.id'
        }
      },
      bug_priority: {
        relation: Model.HasOneRelation,
        modelClass: BugPriority,
        join: {
          from: 'bugs.bug_priority_id',
          to: 'bug_priorities.id'
        }
      },
      users: {
        relation: Model.ManyToManyRelation,
        modelClass: User,
        join: {
          from: 'bugs.id',
          through: {
            from: 'users_bugs.bugs_id',
            to: 'users_bugs.users_id'
          },
          to: 'users.id'
        }
      },
      comments: {
        relation: Model.HasManyRelation,
        modelClass: Comment,
        join: {
          from: 'bugs.id',
          to: 'comments.bug_id'
        }
      }
    }
  }
}

module.exports = Bug;