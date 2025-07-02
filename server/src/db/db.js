// import mysql from "mysql2";
import { Sequelize } from "sequelize";
import dotenv from 'dotenv'
dotenv.config()
// DATABASE_URL='mysql://oo5jqvt1kl5f26uqlj6r:************@aws.connect.psdb.cloud/omegablog?ssl={"rejectUnauthorized":true}'
	

// 'mysql://oo5jqvt1kl5f26uqlj6r:************@aws.connect.psdb.cloud/omegablog?ssl={"rejectUnauthorized":true}'
// const sql = new Sequelize('mysql://oo5jqvt1kl5f26uqlj6r:00000000@aws.connect.psdb.cloud/omegablog?ssl={"rejectUnauthorized":false}&sslcert=/etc/ssl/certs/ca-certificates.crt')
const sql = new Sequelize(process.env.DATABASE_URL,{
  dialect: 'postgres',
  dialectOptions: {
    connectTimeout: 30000, // 30 seconds
  },
}
  
/* ,{  
  dialectOptions: {
    ssl: { // <1>
      rejectUnauthorized: true,
    }
  },
}  */ )
// const sql = new Sequelize("blogsDB", "root", "", {
//   // host: "localhost",
//   host:'mysql://oo5jqvt1kl5f26uqlj6r:pscale_pw_QdbMV8FWIBo0YPg6p1lzx2T5UNONiYdwksxGE6OYWBN@aws.connect.psdb.cloud/omegablog?ssl={"rejectUnauthorized":true}',
//   dialect: "mysql",
// });
sql
  .authenticate()
  .then(() => {
    console.log(`connection has been established successfully`);
  })
  .catch((err) => console.error(err));

  sql.sync({alter:true})
  .then(() => console.log("models created successfully"))
  .catch((err) => console.error(err));



export const db = sql;
