const { Model, DataTypes } = require('sequelize')

const { sequelize } = require('../util/db')

class Tutor extends Model {}

Tutor.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    number: {
      type: DataTypes.TEXT,
    },
    endDate: {
      type: DataTypes.DATE,
    },
    superUserId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: { model: "super_users", key: "id" },
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: { model: "users", key: "id" },
    },
  },
  {
    sequelize,
    timestamps: true,
    underscored: true,
    modelName: "tutor",
  }
);

module.exports = Tutor