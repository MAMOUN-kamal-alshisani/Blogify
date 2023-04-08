import express from "express";
import dotenv from "dotenv";
import { userRoute } from "./src/routes/user.js";
import { authRoute } from "./src/routes/auth.js";
import { blogsRoute } from "./src/routes/blogs.js";
import { profileRoute } from "./src/routes/profile.js";
import cookieParser from "cookie-parser";
import cors from "cors";
dotenv.config();
const PORT = process.env.PORT || 4005;
const server = express();
/// middleware
// {credentials:true,allowedHeaders:true}
server.use(cors({ origin: "http://localhost:3000", credentials: true }));
server.use(cookieParser());
server.use(express.json());
server.use(express.urlencoded({ extended: false }));
server.use([userRoute, authRoute, blogsRoute,profileRoute]);

server.get("/", (req, res) => {
  res.status(200).send("<h1>Home Page</h1>");
});

server.post("/post", (req, res) => {
  const { name } = req.body;
  console.log(req.body);
  res.status(200).send(name);
});

server.listen(PORT, () => console.log(`running on port ${PORT}`));
