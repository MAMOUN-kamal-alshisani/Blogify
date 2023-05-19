import { DataTypes } from "sequelize";
import { db } from "../db/db.js";
import { User } from "./user.js";

export const Profile = db.define('Profile',{

    fullName:{
        type:DataTypes.STRING,
        allowNull: true,
    },
    gender:{
        type:DataTypes.STRING,
        allowNull: true,
    },
    country:{
        type:DataTypes.STRING,
        allowNull: true,
    },
    city:{
        type:DataTypes.STRING,
        allowNull: true,
    },
    phone:{
        type:DataTypes.STRING,
        allowNull: true,
    },
    birthDate:{
        type:DataTypes.DATE ,
        allowNull: true,
    },
    picture:{
        type:DataTypes.STRING 
    }
}) 
Profile.sync({alter:true})
.then(() => console.log("Profile created successfully"))
.catch((err) => console.error(err));
 Profile.belongsTo(User)
// Profile.belongsTo(User,{ constraints: false})
