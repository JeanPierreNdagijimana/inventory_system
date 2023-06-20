import { Sequelize } from "sequelize";
import { db } from "../config/db.js";

const User = db.define(
  "user",
  {
    // Model attributes are defined here
    user_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    role_name: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: "roles",
        key: "role_id",
      },
    },
    user_firstName: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    user_lastName: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    user_email: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    username: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    user_password: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  },
  {
    // Other model options go here
    sequelize: db, // We need to pass the connection instance
    tableName: "users", // We need to choose the model name
    schema: "inventoryDB",
    timestamps: false,
    indexes: [
      {
        name: "PK__users__3213E83F4A9A9E5A",
        unique: true,
        fields: [{ name: "user_id" }],
      },
    ],
  }
);
//self-invoking function
(async () => {
  //create gigs table if it doesn't exist
  await db.sync();
})();

export { User };
