import jwt from "jsonwebtoken";
import { User } from "../models/user.js";
import dotenv from "dotenv";
dotenv.config();

export async function verifyToken(req, res, next) {
  const token = req.cookies.token;
  // console.log(req.cookies.token , 'dsfdsfdsf');
  if (!token) {
    return res.status(400).send("you are not authenticated");
  }

  try {
    const validToken = jwt.verify(token, process.env.SECRET);

    if (validToken) {
      req.user = User.findOne({ where: { id: validToken.id } });

      next();
    }
  } catch (err) {
    res.send(err.message);
    console.log(err);
  }
}


export async function verifyAdmin(req,res,next){
   


  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(400).send("you are not authenticated");
    }
    const validToken = jwt.verify(token, process.env.SECRET);

    if (validToken) {
      req.user =await User.findOne({ where: { id: validToken.id } });

      if(req.user.isAdmin){
        next();
      }else if(!req.user.isAdmin){

        // console.log('you are not authorized!');
        res.status(401).send('you are not authorized!')
      }
      
    }
  } catch (err) {
    res.send(err.message);
    console.log(err);
  }
}