const { Model, DataTypes } = require("sequelize");

const { sequelize } = require("../util/db");

class SuperUser extends Model {}

SuperUser.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    email: {
      type: DataTypes.TEXT,
      validate: {
        isEmail: true,
      },
    },
    username: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    name: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    password: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    sequelize,
    underscored: true,
    timestamps: true,
    modelName: "user",
  }
);

module.exports = SuperUser;
