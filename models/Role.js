import { Sequelize } from "sequelize";
import { db } from "../config/db.js";

const Role = db.define(
  "roles",
  {
    role_id: {
      autoIncrement: true,
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    role_name: {
      type: Sequelize.STRING(50),
      allowNull: false,
    },
  },
  {
    sequelize: db,
    tableName: "roles",
    schema: "inventoryDB",
    timestamps: false,
    indexes: [
      {
        name: "PK__roles__8AFACE1B8E0AED6D",
        unique: true,
        fields: [{ name: "role_id" }],
      },
    ],
  }
);

//self-invoking function
(async () => {
  //create gigs table if it doesn't exist
  await db.sync();
})();

export { Role };
