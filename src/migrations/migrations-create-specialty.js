'use strict';

const { name } = require("ejs");

module.exports = {
    up: async (queryInterface, Sequelize) => {
        //  description: DataTypes.TEXT,
        // image: DataTypes.STRING,
        await queryInterface.createTable('specialty', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            description: {
                type: Sequelize.TEXT
            },
            image: {
                type: Sequelize.TEXT('long')
            },

            name: {
                type: Sequelize.STRING
            },


            contentHTML: {
                allowNull: false,
                type: Sequelize.TEXT('long'),
            },

            contentMarkdown: {
                allowNull: false,
                type: Sequelize.TEXT('long'),
            },


            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            }
        });
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('specialty');
    }
};