const { DataTypes } = require('sequelize')

module.exports = {
    up: async ({ context: queryInterface }) => {
        await queryInterface.addColumn('pairings', 'location', {
            type: DataTypes.TEXT
        })
    },
    down: async ({ context: queryInterface }) => {
        await queryInterface.dropColumn('pairings', 'location')
    }
}