"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("assignments", [
      {
        createdAt: new Date(),
        updatedAt: new Date(),
        devices_id: 13,
        employees_id: 1,
      },
      {
        createdAt: new Date(),
        updatedAt: new Date(),
        devices_id: 14,
        employees_id: 2,
      },
      {
        createdAt: new Date(),
        updatedAt: new Date(),
        devices_id: 15,
        employees_id: 2,
      },
      {
        createdAt: new Date(),
        updatedAt: new Date(),
        devices_id: 16,
        employees_id: 3,
      },
    ]);
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("assignments", null, {});
  },
};
