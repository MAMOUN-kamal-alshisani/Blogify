import express from "express";
export const userRoute = express.Router();
import {
  getAllUsers,
  getUser,
  updateUser,
  createUser,
  deleteUser,
//   getUsersById,
} from "../controllers/users.js";
import { verifyToken, verifyAdmin } from "../middleware/auth.js";

// userRoute.get('/api/user'/*,verifyToken*/,getUsers)
// userRoute.get('/api/user/get/:id'/*,verifyToken*/,getUsersById)

userRoute.get("/api/user", getAllUsers);
userRoute.get("/api/user/:id" /*,verifyToken*/, getUser);
userRoute.put("/api/user/:id", verifyAdmin, updateUser);
userRoute.post("/api/user", verifyAdmin, createUser);
userRoute.delete("/api/user/:id", verifyAdmin, deleteUser);
