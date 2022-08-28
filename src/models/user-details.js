const { Model, Sequelize } = require('sequelize');

const {
  TableConstants: { USER_DETAILS, USER_ROLE },
} = require('../constants');

module.exports = (sequelize, DataTypes) => {
  class UserDetails extends Model {
    static associate({ userRole }) {
      this.belongsTo(userRole, {
        foreignKey: 'role',
        as: 'userRole',
        allowNull: false,
        onDelete: 'cascade',
        onUpdate: 'cascade',
      });
    }

    toJSON() {
      return { ...this.get() };
    }
  }
  UserDetails.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.BIGINT,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: null,
      },
      phoneNumber: {
        type: DataTypes.BIGINT,
        allowNull: true,
        unique: true,
        defaultValue: null,
      },
      isVerified: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      role: {
        type: DataTypes.BIGINT,
        allowNull: false,
        references: { model: USER_ROLE.tableName, key: 'id' },
      },
      isDeactivated: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      isDeleted: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      resetPasswordExpire: {
        type: DataTypes.DATE,
        defaultValue: null,
      },
      resetPasswordToken: {
        type: DataTypes.STRING,
        defaultValue: null,
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
      modelName: USER_DETAILS.modelName,
      tableName: USER_DETAILS.tableName,
      timestamps: true,
    },
  );
  return UserDetails;
};
