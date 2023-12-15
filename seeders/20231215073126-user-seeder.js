"use strict";

const bcrypt = require("bcrypt");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.bulkInsert("users", [
            {
                name: "Dimas Pondra Oktafianto",
                occupation: "Admin Micro",
                email: "admin@mail.com",
                password: await bcrypt.hash("secret", 10),
                role: "admin",
                created_at: new Date(),
                updated_at: new Date(),
            },
            {
                name: "John Adam",
                occupation: "Staff",
                email: "john@mail.com",
                password: await bcrypt.hash("secret", 10),
                role: "student",
                created_at: new Date(),
                updated_at: new Date(),
            },
        ]);
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete("users", null, {});
    },
};
