import express from "express";
import dotenv from "dotenv";
import { userRoute } from "./src/routes/user.js";
import { authRoute } from "./src/routes/auth.js";
import { blogsRoute } from "./src/routes/blogs.js";
import { profileRoute } from "./src/routes/profile.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import multer from "multer";
dotenv.config();
const PORT = process.env.PORT || 4005;
const server = express();
// import path from 'path'
/// middleware
// {credentials:true,allowedHeaders:true}


// const __dirname =path.dirname()
server.use(cors({ origin: "http://localhost:3000", credentials: true }));
server.use(cookieParser());
server.use(express.json());
server.use(express.urlencoded({ extended: false }));
server.use([userRoute, authRoute, blogsRoute,profileRoute]);

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './../client/src/uploads')
  },
  filename: function (req, file, cb) {
    // const uniqueSuffix =  )
    cb(null,Date.now() + file.originalname)
  }
})

const upload = multer({ storage: storage })


server.post('/api/upload', upload.single('file'), function (req, res) {
  // req.file is the `avatar` file
  // req.body will hold the text fields, if there were any
  res.status(201).json(req.file.filename)
})

server.get("/", (req, res) => {
  res.status(200).send("<h1>Home Page</h1>");
});

server.post("/post", (req, res) => {
  const { name } = req.body;
  console.log(req.body);
  res.status(200).send(name);
});
server.use(express.static('public'))

server.listen(PORT, () => console.log(`running on port ${PORT}`));





