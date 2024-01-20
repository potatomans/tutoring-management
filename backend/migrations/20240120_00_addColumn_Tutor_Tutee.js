const { DataTypes } = require("sequelize");

module.exports = {
  up: async ({ context: queryInterface }) => {
    await queryInterface.addColumn("tutors", "user_id", {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: { model: "users", key: "id" },
    });
    await queryInterface.addColumn("tutees", "user_id", {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: { model: "users", key: "id" },
    });
  },
  down: async ({ context: queryInterface }) => {
    await queryInterface.removeColumn("tutors", "user_id");
    await queryInterface.removeColumn("tutees", "user_id");
  },
};
