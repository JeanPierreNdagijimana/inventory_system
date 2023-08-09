"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("departments", [
      {
        name: "IT",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "HR",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Finance",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Marketing",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Sales",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Operations",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("departments", null, {});
  },
};
