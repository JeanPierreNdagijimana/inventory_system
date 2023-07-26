"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("assignments", [
      {
        createdAt: new Date(),
        updatedAt: new Date(),
        devices_id: 1,
        employees_id: 1,
      },
      {
        createdAt: new Date(),
        updatedAt: new Date(),
        devices_id: 1,
        employees_id: 2,
      },
      {
        createdAt: new Date(),
        updatedAt: new Date(),
        devices_id: 3,
        employees_id: 2,
      },
      {
        createdAt: new Date(),
        updatedAt: new Date(),
        devices_id: 4,
        employees_id: 3,
      },
    ]);
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("assignments", null, {});
  },
};
