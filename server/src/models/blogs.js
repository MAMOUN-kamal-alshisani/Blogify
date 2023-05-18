import { db } from "../db/db.js";
import { DataTypes } from "sequelize";
import { User } from "./user.js";
export const Blogs = db.define("Blogs", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
//   desc: {
//     type: DataTypes.STRING,
//     allowNull: false,
//   },
  category: {
    type: DataTypes.STRING,
//     allowNull: false,
  },

  photo: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  // liked: {
  //   type: DataTypes.STRING,
  //   allowNull: false,
  //   get() {
  //     return this.getDataValue("liked").split(";");
  //   },
  //   set(value) {
  //     return this.setDataValue("liked", value.join(";"));
  //   },
  // },
  watched: {
    type: DataTypes.STRING,
  },
//   UserId:{
//     type: DataTypes.STRING,
//   },
});
Blogs.sync({alter:true})
.then(() => console.log("Profile created successfully"))
.catch((err) => console.error(err));
Blogs.belongsTo(User)
// Blogs.belongsTo(User,{ constraints: false})
