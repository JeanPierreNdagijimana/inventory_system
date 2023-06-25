import { Sequelize } from "sequelize";

export const db = new Sequelize("inventoryDB", "root", "", {
  host: "localhost",
  dialect: "mysql",
});
