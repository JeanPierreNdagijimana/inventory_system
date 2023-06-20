import { Sequelize } from "sequelize";
import { db } from "../config/db.js";

const Department = db.define(
  "department",
  {
    department_id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    department_name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  },
  {
    sequelize: db,
    tableName: "departments",
    schema: "inventoryDB",
    timestamps: false,
    indexes: [
      {
        name: "PK__departme__B9A1CFAA4A8E0B0E",
        unique: true,
        fields: [{ name: "department_id" }],
      },
    ],
  }
);

//self-invoking function
(async () => {
  //create gigs table if it doesn't exist
  await db.sync();
})();

export default Department;
