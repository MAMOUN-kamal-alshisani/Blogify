import { DataTypes } from "sequelize";
import { db } from "../db/db.js";
import { User } from "./user.js";

export const Profile = db.define('Profile',{
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
    
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
        type:DataTypes.STRING,
        defaultValue: "http://genslerzudansdentistry.com/wp-content/uploads/2015/11/anonymous-user.png"
    },
    linkedIn:{
        type:DataTypes.STRING,
        allowNull:true,
        defaultValue: null
    },
    twitter:{
        type:DataTypes.STRING,
        allowNull:true,
        defaultValue: null
    },
    socialEmail:{
        type:DataTypes.STRING,
        allowNull:true,
        defaultValue: null
    },
    
}) 
// Profile.sync({alter:true})
// .then(() => console.log("Profile created successfully"))
// .catch((err) => console.error(err));
 Profile.belongsTo(User)
// Profile.belongsTo(User,{ constraints: false})
