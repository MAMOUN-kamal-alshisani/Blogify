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
profileRoute.get("/api/profile",verifyAdmin ,getAllProfiles);
profileRoute.get("/api/profile/:id",verifyToken, getProfile);
profileRoute.post("/api/profile/:UserId", verifyToken,createProfile);
profileRoute.put("/api/profile/:id",verifyToken ,updateProfile);
profileRoute.delete("/api/profile/:id",verifyToken ,deleteProfile);
