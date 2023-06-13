import { Sequelize } from "sequelize";

export const db = new Sequelize("inventoryDB", "root", "Learning@Time1", {
  host: "localhost",
  dialect: "mysql",
});
