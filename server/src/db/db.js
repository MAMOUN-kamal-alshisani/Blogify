// import mysql from "mysql2";
import { Sequelize } from "sequelize";

const sql = new Sequelize("blogsDB", "root", "", {
  host: "localhost",
  dialect: "mysql",
});

sql
  .authenticate()
  .then(() => {
    console.log(`connection has been established successfully`);
  })
  .catch((err) => console.error(err));

  sql.sync()
  .then(() => console.log("models created successfully"))
  .catch((err) => console.error(err));



export const db = sql;
