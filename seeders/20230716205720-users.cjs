"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("users", [
      {
        first_name: "jean",
        last_name: "pierre",
        email: "jean.pierre@gmail.com",
        username: "jpierre",
        password:
          "$2a$10$XLnQzSpSAMXYSiZflpDYV.RjyYd69653zyyhCBBQVkex3yOMeckbC",
        createdAt: new Date(),
        updatedAt: new Date(),
        roles_id: 1,
      },
    ]);
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("users", null, {});
  },
};
