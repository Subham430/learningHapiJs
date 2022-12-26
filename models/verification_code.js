'use strict';
const {
  Model
} = require('sequelize');
const user = require('./user');
module.exports = (sequelize, DataTypes) => {
  class verification_code extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  verification_code.init({
    user_id: {
      type: DataTypes.BIGINT,
      references: {
        model: user,
        key: 'id'
      }
    },
    code: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'verification_code',
  });
  return verification_code;
};