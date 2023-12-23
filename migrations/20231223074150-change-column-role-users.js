"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.changeColumn("users", "role", {
            type: Sequelize.ENUM,
            values: ["admin", "student", "mentor"],
            allowNull: false,
        });
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.changeColumn("users", "role", {
            type: Sequelize.ENUM,
            values: ["admin", "student"],
            allowNull: false,
        });
    },
};
