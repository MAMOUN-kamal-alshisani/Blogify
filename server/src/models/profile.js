import { DataTypes } from "sequelize";
import { db } from "../db/db.js";
import { User } from "./user.js";

export const Profile = db.define('Profile',{

    fullName:{
        type:DataTypes.STRING,
    },
    gender:{
        type:DataTypes.STRING,
    },
    country:{
        type:DataTypes.STRING,
    },
    city:{
        type:DataTypes.STRING,
    },
    phone:{
        type:DataTypes.STRING,
    },
    birthDate:{
        type:DataTypes.DATE 
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
