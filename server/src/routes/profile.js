import express from "express";
import { verifyToken,verifyAdmin } from '../middleware/auth.js'

import {
    getAllProfiles,
  getProfile,
  getUserProfile,
  createProfile,
  updateProfile,
  deleteProfile,
  updateUserProfile
} from "../controllers/profile.js";
export const profileRoute = express.Router();
profileRoute.get("/api/profile",verifyAdmin,getAllProfiles);
profileRoute.get("/api/profile/:id",verifyToken, getProfile);
profileRoute.get("/api/user/profile/:UserId", getUserProfile);

profileRoute.post("/api/profile/:UserId",createProfile);
profileRoute.put("/api/profile/:id",updateProfile);
profileRoute.put("/api/user/profile/:UserId",updateUserProfile);
profileRoute.delete("/api/profile/:id",verifyToken,deleteProfile);
