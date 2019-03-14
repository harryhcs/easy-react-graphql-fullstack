const Password = require('objection-password')();
const Model = require('objection').Model;

// eslint-disable-next-line new-cap
export default class BaseModel extends Password(Model) {
  $beforeInsert() {
    this.createdAt = new Date().toISOString();
    this.updatedAt = new Date().toISOString();
  }

  $beforeUpdate() {
    this.updatedAt = new Date().toISOString();
  }
}
