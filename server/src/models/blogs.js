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
   desc: {
   type: DataTypes.STRING(1000),
//     allowNull: false,
  },
  category: {
    type: DataTypes.STRING,
//     allowNull: false,
  },

  photo: {
    type: DataTypes.STRING,
//    allowNull: false,
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
    allowNull: true,
  },
  featured: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  liked: {
    type: DataTypes.ARRAY(DataTypes.INTEGER),
    allowNull: true,
    defaultValue:[]
  },
  UserId: {
    type: DataTypes.INTEGER,
  },
//   UserId:{
//     type: DataTypes.STRING,
//   },
});
// Blogs.sync({alter:true})
// .then(() => console.log("Blogs created successfully"))
// .catch((err) => console.error(err));
Blogs.belongsTo(User)
// Blogs.belongsTo(User,{ constraints: false})
