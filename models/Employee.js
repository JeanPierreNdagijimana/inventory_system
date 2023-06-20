import { Sequelize } from "sequelize";
import { db } from "../config/db.js";

const Employee = db.define(
  "employee",
  {
    employee_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    department_name: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: "departments",
        key: "department_id",
      },
    },
    employee_firstName: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    employee_lastName: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    employee_email: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    employee_country: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  },
  {
    sequelize: db, // We need to pass the connection instance
    tableName: "employees", // We need to choose the model name
    schema: "inventoryDB",
    timestamps: false,
    indexes: [
      {
        name: "PK__employees__3213E83F4A9A9E5A",
        unique: true,
        fields: [{ name: "employee_id" }],
      },
    ],
  }
);

//self-invoking function
(async () => {
  //create gigs table if it doesn't exist
  await db.sync();
})();

export default Employee;
