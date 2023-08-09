"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("devices", [
      {
        model: "Lenovo Thinkpad",
        serial_number: "LE588T39",
        code: "Lap-214GJ5SY",
        createdAt: new Date(),
        updatedAt: new Date(),
        device_types_id: 7,
      },
      {
        model: "Lenovo Thinkpad USB-C Dock Gen. 240AS",
        serial_number: "HP547F24",
        code: "DS-954GM3D3",
        createdAt: new Date(),
        updatedAt: new Date(),
        device_types_id: 11,
      },
      {
        model: "HP laserjet Pro M304e",
        serial_number: "HP874L65",
        code: "Pr-845FHK5D",
        createdAt: new Date(),
        updatedAt: new Date(),
        device_types_id: 12,
      },
      {
        model: "Apple iPhone 12",
        serial_number: "AP632S42E",
        code: "Mob-FKL5846D",
        createdAt: new Date(),
        updatedAt: new Date(),
        device_types_id: 9,
      },
      {
        model: "Dell Latitude",
        serial_number: "DE543J25",
        code: "Lap-FK562R14",
        createdAt: new Date(),
        updatedAt: new Date(),
        device_types_id: 7,
      },
      {
        model: "Lenovo Thinkpad",
        serial_number: "LE754N24",
        code: "Lap-856SKJG6",
        createdAt: new Date(),
        updatedAt: new Date(),
        device_types_id: 7,
      },
      {
        model: "Asus Zenbook",
        serial_number: "AS216M17",
        code: "Lap-P85WK523",
        createdAt: new Date(),
        updatedAt: new Date(),
        device_types_id: 7,
      },
      {
        model: "Sony Vaio",
        serial_number: "SO146P64",
        code: "Lap-JG5O964D",
        createdAt: new Date(),
        updatedAt: new Date(),
        device_types_id: 7,
      },
      {
        model: "HP USB-C Dock G5",
        serial_number: "HP852A36",
        code: "DS-71F3M8AQ",
        createdAt: new Date(),
        updatedAt: new Date(),
        device_types_id: 11,
      },
      {
        model: "Samsung Galaxy",
        serial_number: "SA5473AS67",
        code: "Mob-21FL5PQ3",
        createdAt: new Date(),
        updatedAt: new Date(),
        device_types_id: 9,
      },
      {
        model: "Apple Ipad",
        serial_number: "AP7895H34",
        code: "Tab-8456FG1Q",
        createdAt: new Date(),
        updatedAt: new Date(),
        device_types_id: 10,
      },
    ]);
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("devices", null, {});
  },
};
