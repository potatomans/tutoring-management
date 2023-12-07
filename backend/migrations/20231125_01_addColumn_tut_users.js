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
    await queryInterface.dropTable("tutors");
    await queryInterface.dropTable("tutees");
    await queryInterface.dropTable("users");
  },
};
