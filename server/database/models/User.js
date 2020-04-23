const { Model } = require('objection');

class User extends Model {
  static get tableName(){
    return "users";
  }

  static get idColumn() {
    return 'id';
  }

  static get relationMappings(){
    const Project = require('./Project');
    const ProjectPosition = require('./ProjectPosition');
    const Company = require('./Company');
    const Bug = require('./Bug');

    return {
      project_position: {
        relation: Model.HasOneRelation,
        modelClass: ProjectPosition,
        join: {
          from: 'users.project_position_id',
          to: 'project_positions.id'
        }
      },
      company: {
        relation: Model.HasOneRelation,
        modelClass: Company,
        join: {
          from: 'users.company_id',
          to: 'companies.id'
        }
      },
      projects: {
        relation: Model.HasManyRelation,
        modelClass: Project,
        join: {
          from: 'users.id',
          to: 'projects.project_creator_id'
        }
      },
      bugs: {
        relation: Model.ManyToManyRelation,
        modelClass: Bug,
        join: {
          from: 'users.id',
          through: {
            from: 'users_bugs.users_id',
            to: 'users_bugs.bugs_id',
          },
          to: 'bugs.id'
        },
      },
      project: {
        relation: Model.BelongsToOneRelation,
        modelClass: Project,
        join: {
          from: 'bugs.project_id',
          to: 'projects.id'
        }
      },
    }
  }
}

module.exports = User;