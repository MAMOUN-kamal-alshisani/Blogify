// import express from "express";
// import { upload, profilePicture } from "../controllers/uploads.js";
// export const uploadRoute = express.Router();

// /// upload profile pictures controller
// uploadRoute.post(
//   "/api/upload/profile",
//   profilePicture.single("file"),
//   function (req, res) {
//     // req.file is the `avatar` file
//     // req.body will hold the text fields, if there were any
//     res.status(201).json(req.file.filename);
//   }
// );

// /// upload blog photos controller
// uploadRoute.post("/api/upload", upload.single("file"), function (req, res) {
//   // req.file is the `avatar` file
//   // req.body will hold the text fields, if there were any
//   res.status(201).json(req.file.filename);
// });
import express from 'express'
import {
  uploadBlogPic,
  uploadProfilePic,
  handleUserBlogUpload,
  handleUserPictureUpload,
} from "../controllers/uploads.js";

export const uploadRoute =express.Router()

uploadRoute.post(
  "/api/upload/profile",
  uploadProfilePic.single("file"),
  handleUserPictureUpload
);

uploadRoute.post(
  "/api/upload/blog",
  uploadBlogPic.single("file"),
  handleUserBlogUpload
);
