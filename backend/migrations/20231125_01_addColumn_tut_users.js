const { DataTypes } = require("sequelize");

module.exports = {
  up: async ({ context: queryInterface }) => {
    await queryInterface.addColumn("tutors","super_user_id", 
      {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: { model: "super_users", key: "id" },
      },
    );
    await queryInterface.addColumn("tutees", "super_user_id", {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: { model: "super_users", key: "id" },
    });
    await queryInterface.addColumn("users", "super_user_id", {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: { model: "super_users", key: "id" },
    });
  },
  down: async ({ context: queryInterface }) => {
    await queryInterface.removeColumn("tutors", 'super_user_id')
    await queryInterface.removeColumn("tutees", "super_user_id");
    await queryInterface.removeColumn("users", "super_user_id");
  },
};
