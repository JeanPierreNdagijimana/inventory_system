import { Sequelize } from "sequelize";
import { db } from "../config/db.js";
const Assignment = db.define(
  "assignments",
  {
    assignment_id: {
      autoIncrement: true,
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    employee_email: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: "employees",
        key: "employee_id",
      },
    },
    device_name: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: "devices",
        key: "device_id",
      },
    },
    assignment_status: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize: db,
    tableName: "assignments",
    schema: "inventoryDB",
    timestamps: false,
    indexes: [
      {
        name: "PK__assignme__B3A1D4E5E6F5F8F7",
        unique: true,
        fields: [{ name: "assignment_id" }],
      },
    ],
  }
);
//self-invoking function
(async () => {
  //create gigs table if it doesn't exist
  await db.sync();
})();

export { Assignment };
