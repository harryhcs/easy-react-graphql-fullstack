import BaseModel from '../lib/BaseModel';
export const schema = {
  type: 'object',
  required: ['username', 'password'],

  properties: {
    id: { type: 'integer' },
    email: { type: 'string' },
    password: { type: 'string' },
  },
};

export default class Users extends BaseModel {
  static get tableName() {
    return 'accounts_manager_user';
  }

  static get relationMappings() {
    return {
      organisations: {
        relation: BaseModel.HasManyRelation,
        modelClass: this.allModels().Organisation,
        join: { from: 'users.id', to: 'organisations.owner_id' },
      },
    };
  }

  static get jsonSchema() {
    return schema;
  }
}
