import BaseModel from '../lib/BaseModel';

export const schema = {
  type: 'object',
  required: ['name', 'slug', 'owner_id'],

  properties: {
    id: { type: 'integer' },
    name: { type: 'string' },
    slug: { type: 'string' },
    user: { type: 'object' },
  },
};

export default class Organisation extends BaseModel {
  static get tableName() {
    return 'accounts_manager_organization';
  }

  static get relationMappings() {
    return {
      organisation: {
        relation: BaseModel.BelongsToOneRelation,
        modelClass: this.allModels().Category,
        join: {
          from: 'organisations.owner_id',
          to: 'users.id',
        },
      },
    };
  }

  static get jsonSchema() {
    return schema;
  }
}
