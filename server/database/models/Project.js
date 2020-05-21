const { Model } = require('objection');

class Project extends Model {
  static get tableName(){
    return "projects";
  }

  static get idColumn() {
    return 'id';
  }

  static get relationMappings() {
    const User = require('./User');
    const Bug = require('./Bug');
    const ProjectStatus = require('./ProjectStatus');

    return {
      project_creator: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: 'projects.project_creator_id',
          to: 'users.id'
        }
      },
      project_status: {
        relation: Model.HasOneRelation,
        modelClass: ProjectStatus,
        join: {
          from: 'projects.project_status_id',
          to: 'project_statuses.id'
        }
      },
      bugs: {
        relation: Model.HasManyRelation,
        modelClass: Bug,
        join: {
          from: 'projects.id',
          to: 'bugs.project_id'
        }
      }
    }
  }
}

module.exports = Project;