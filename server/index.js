import express from "express";
import dotenv from "dotenv";
dotenv.config();
import cookieParser from "cookie-parser";
import cors from "cors";
import { userRoute } from "./src/routes/user.js";
import { authRoute } from "./src/routes/auth.js";
import { blogsRoute } from "./src/routes/blogs.js";
import { profileRoute } from "./src/routes/profile.js";
import {uploadRoute} from './src/routes/uploads.js'


const PORT = process.env.PORT || 4005;
const server = express();


/// middleware
server.use(express.static("public"));
server.use(cors({ origin: [process.env.CLIENT_APP,process.env.FIREBASE_URL], credentials: true }));
server.use(cookieParser());
server.use(express.json());
server.use(express.urlencoded({ extended: false }));
server.use([userRoute, authRoute, blogsRoute, profileRoute, uploadRoute]);


server.get("/", (req, res) => {
  res.status(200).send("<h1>Home Page</h1>");
});

// Error handling middleware
server.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something went wrong!");
});

server.listen(PORT, () => console.log(`running on port ${PORT}`));
