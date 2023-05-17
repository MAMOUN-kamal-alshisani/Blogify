import express from "express";
import { verifyToken,verifyAdmin } from '../middleware/auth.js'

import {
    getAllProfiles,
  getProfile,
  createProfile,
  updateProfile,
  deleteProfile,
} from "../controllers/profile.js";
export const profileRoute = express.Router();
profileRoute.get("/api/profile",getAllProfiles);
profileRoute.get("/api/profile/:id", getProfile);
profileRoute.post("/api/profile/:UserId",createProfile);
profileRoute.put("/api/profile/:id",updateProfile);
profileRoute.delete("/api/profile/:id",deleteProfile);
