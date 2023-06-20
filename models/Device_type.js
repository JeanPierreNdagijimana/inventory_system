import { Sequelize } from "sequelize";
import { db } from "../config/db.js";

const Device_type = db.define(
  "device_type",
  {
    device_type_id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    device_type_name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    devive_type_prefix: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  },
  {
    sequelize: db,
    tableName: "device_types",
    schema: "inventoryDB",
    timestamps: false,
    indexes: [
      {
        name: "PK__device_t__B3A1D4E5E6F5F8F7",
        unique: true,
        fields: [{ name: "device_type_id" }],
      },
    ],
  }
);

//self-invoking function
(async () => {
  //create gigs table if it doesn't exist
  await db.sync();
})();

export { Device_type };
