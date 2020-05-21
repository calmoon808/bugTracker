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
    const CompanyPosition = require('./CompanyPosition');
    const Bug = require('./Bug');

    return {
      company_position: {
        relation: Model.HasOneRelation,
        modelClass: CompanyPosition,
        join: {
          from: 'users.company_position_id',
          to: 'company_positions.id'
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
    }
  }
}

module.exports = User;