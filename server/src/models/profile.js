import { DataTypes } from "sequelize";
import { db } from "../db/db.js";
import { User } from "./user.js";

export const Profile = db.define('Profile',{

    LastName:{
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

Profile.belongsTo(User)