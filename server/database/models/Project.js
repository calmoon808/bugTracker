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
    const Company = require('./Company');
    const Bug = require('./Bug');

    return {
      project_creator: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: 'projects.project_creator_id',
          to: 'users.id'
        }
      },
      company: {
        relation: Model.BelongsToOneRelation,
        modelClass: Company,
        join: {
          from: 'projects.company_id',
          to: 'companies.id'
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