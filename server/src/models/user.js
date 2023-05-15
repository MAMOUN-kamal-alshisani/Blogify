import { db } from "../db/db.js";

import { DataTypes } from "sequelize";

export const User = db.define("User", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },

  UserName: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
      len: [2, 30],
    },
  },
  Email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
      notEmpty: true,
    },
  },
  Password: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
      min: 6,
    },
  },
  isAdmin: {
    type:DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
});

// User.sync()
//   .then(() => console.log("user model connected"))
//   .catch((err) => console.error(err));


