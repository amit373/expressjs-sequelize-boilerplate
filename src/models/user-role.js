const { Model, Sequelize } = require('sequelize');

const {
  UserRoles,
  TableConstants: { USER_ROLE },
} = require('../constants');

module.exports = (sequelize, DataTypes) => {
  class UserRole extends Model {
    static associate() {}

    toJSON() {
      return { ...this.get() };
    }
  }
  UserRole.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.BIGINT,
      },
      role: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: UserRoles.USER,
        unique: true,
      },
      isActive: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: Sequelize.fn('NOW'),
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: Sequelize.fn('NOW'),
      },
    },
    {
      sequelize,
      modelName: USER_ROLE.modelName,
      tableName: USER_ROLE.tableName,
      timestamps: true,
    },
  );
  return UserRole;
};
