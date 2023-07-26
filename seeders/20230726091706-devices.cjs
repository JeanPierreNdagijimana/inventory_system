// let { generateCode } = await import("../controllers/devices.js");
// let { device_types_id } = await import("../controllers/devices.js");
// const Device_type = require("../models/Device_type.js");
// const Device = require("../models/Device.js");
// import { generateCode } from "../controllers/devices.js";
// import { device_types_id } from "../controllers/devices.js";
// import Device_type from "../models/Device_type.js";
// import Device from "../models/Device.js";

// const { generateCode } = require("../controllers/devices.js");
// const { device_types_id } = require("../controllers/devices.js");
// const Device_type = require("../models/Device_type.js");
// const Device = require("../models/Device.js");

import * as generateCode from "../controllers/devices.js";
import * as device_types_id from "../controllers/devices.js";
import * as Device_type from "../models/Device_type.js";
import * as Device from "../models/Device.js";

// async (async) => {
//   let { generateCode } = await import("../controllers/devices.js");
//   let { device_types_id } = await import("../controllers/devices.js");
//   const Device_type = require("../models/Device_type.js");

import("../controllers/devices.js").then((obj) => {
  obj.generateCode();
});
import("../controllers/devices.js").then((obj) => {
  obj.device_types_id();
});
import("../models/Device_type.js").then((obj) => {
  obj.Device_type();
});
import("../models/Device.js").then((obj) => {
  obj.Device();
});

("use strict");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    const device_type = await Device_type.findOne({
      attributes: ["prefix"],
      where: { id: device_types_id },
    });

    const code = await generateCode(device_type.prefix);

    async function generateCode(prefix) {
      const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
      let code = prefix + "-";

      for (let i = 0; i < 8; i++) {
        code += characters.charAt(
          Math.floor(Math.random() * characters.length)
        );
      }

      // check if code already exists
      const device = await Device.findOne({ where: { code } });

      if (device != null) {
        return generateCode(prefix);
      }

      return code;
    }

    await queryInterface.bulkInsert("devices", [
      // {
      //   model: "HP Elitebook",
      //   serial_number: "HP548F24",
      //   code,
      //   createdAt: new Date(),
      //   updatedAt: new Date(),
      //   device_types_id: 1,
      // },
      // {
      //   model: "Lenovo Thinkpad",
      //   serial_number: "LE588T39",
      //   code,
      //   createdAt: new Date(),
      //   updatedAt: new Date(),
      //   device_types_id: 1,
      // },
      // {
      //   model: "Lenovo Thinkpad USB-C Dock Gen. 240AS",
      //   serial_number: "HP547F24",
      //   code,
      //   createdAt: new Date(),
      //   updatedAt: new Date(),
      //   device_types_id: 5,
      // },
      // {
      //   model: "HP laserjet Pro M304e",
      //   serial_number: "HP874L65",
      //   code,
      //   createdAt: new Date(),
      //   updatedAt: new Date(),
      //   device_types_id: 6,
      // },
      // {
      //   model: "Apple iPhone 12",
      //   serial_number: "AP632S42E",
      //   code,
      //   createdAt: new Date(),
      //   updatedAt: new Date(),
      //   device_types_id: 3,
      // },
      // {
      //   model: "Dell Latitude",
      //   serial_number: "DE543J25",
      //   code,
      //   createdAt: new Date(),
      //   updatedAt: new Date(),
      //   device_types_id: 2,
      // },
      // {
      //   model: "Lenovo Thinkpad",
      //   serial_number: "LE754N24",
      //   code,
      //   createdAt: new Date(),
      //   updatedAt: new Date(),
      //   device_types_id: 1,
      // },
      // {
      //   model: "Asus Zenbook",
      //   serial_number: "AS216M17",
      //   code,
      //   createdAt: new Date(),
      //   updatedAt: new Date(),
      //   device_types_id: 1,
      // },
      // {
      //   model: "Sony Vaio",
      //   serial_number: "SO146P64",
      //   code,
      //   createdAt: new Date(),
      //   updatedAt: new Date(),
      //   device_types_id: 1,
      // },
      // {
      //   model: "HP USB-C Dock G5",
      //   serial_number: "HP852A36",
      //   code,
      //   createdAt: new Date(),
      //   updatedAt: new Date(),
      //   device_types_id: 5,
      // },
      // {
      //   model: "Samsung Galaxy",
      //   serial_number: "SA5473AS67",
      //   code,
      //   createdAt: new Date(),
      //   updatedAt: new Date(),
      //   device_types_id: 3,
      // },
      {
        model: "Apple Ipad",
        serial_number: "AP7895H34",
        code: generateCode,
        createdAt: new Date(),
        updatedAt: new Date(),
        // device_types_id: 4,
      },
    ]);
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("devices", null, {});
  },
};
// };

// Import necessary modules or functions using dynamic import()
// async function up(queryInterface, Sequelize) {
//   const devicesController = await import("../controllers/devices.js");
//   const Device_type = (await import("../models/Device_type.js")).default;
//   const Device = (await import("../models/Device.js")).default;

//   // Get the device_types_id from the devicesController module
//   const device_types_id = devicesController.device_types_id;

//   const device_type = await Device_type.findOne({
//     attributes: ["prefix"],
//     where: { id: device_types_id },
//   });

//   const code = await generateCode(device_type.prefix);

//   await queryInterface.bulkInsert("devices", [
//     {
//       model: "HP Elitebook",
//       serial_number: "HP548F24",
//       code,
//       createdAt: new Date(),
//       updatedAt: new Date(),
//       device_types_id: 1,
//     },
//     // Add more device records as needed
//   ]);
// }

// async function down(queryInterface, Sequelize) {
//   await queryInterface.bulkDelete("devices", null, {});
// }

// module.exports = {
//   up,
//   down,
// };
