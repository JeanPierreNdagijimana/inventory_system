"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("employees", [
      {
        first_name: "John",
        last_name: "Doe",
        email: "jogn.doe@gmail.com",
        country: "USA",
        createdAt: new Date(),
        updatedAt: new Date(),
        departments_id: 1,
      },
      {
        first_name: "Jane",
        last_name: "Doe",
        email: "jane.doe@gmail.com",
        country: "UK",
        createdAt: new Date(),
        updatedAt: new Date(),
        departments_id: 2,
      },
      {
        first_name: "Jack",
        last_name: "Ryan",
        email: "jack.ryan@gmail.com",
        country: "Canada",
        createdAt: new Date(),
        updatedAt: new Date(),
        departments_id: 3,
      },
      {
        first_name: "James",
        last_name: "Bond",
        email: "james.bond@gmail.com",
        country: "Ireland",
        createdAt: new Date(),
        updatedAt: new Date(),
        departments_id: 4,
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("employees", null, {});
  },
};
