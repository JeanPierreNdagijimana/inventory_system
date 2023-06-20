import { Sequelize } from "sequelize";
import { db } from "../config/db.js";

const Device = db.define(
  "device",
  {
    device_id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    device_type_name: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: "device_types",
        key: "device_type_id",
      },
    },
    device_model: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    device_serial_number: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    device_code: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    device_status: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize: db,
    tableName: "devices",
    schema: "inventoryDB",
    timestamps: false,
    indexes: [
      {
        name: "PK__assignme__B3A1D4E5E6F5F8F7",
        unique: true,
        fields: [{ name: "device_id" }],
      },
    ],
  }
);

//self-invoking function
(async () => {
  //create gigs table if it doesn't exist
  await db.sync();
})();

export { Device };
