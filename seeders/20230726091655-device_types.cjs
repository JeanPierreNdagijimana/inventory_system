"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("device_types", [
      {
        name: "Laptop",
        prefix: "Lap",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Desktop",
        prefix: "Desk",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Mobile",
        prefix: "Mob",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Tablet",
        prefix: "Tab",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Docking Station",
        prefix: "DS",
        createdAt: new Date(),
        updatedAt: new Date(),
      },

      {
        name: "Printer",
        prefix: "Pr",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("device_types", null, {});
  },
};
