import express from "express";
import {
  getAllBlogs,
  createBlog,
  getBlog,
  updateBlog,
  deleteBlog,
  getUserBlogs,
  getBlogsByLatest,
  getAdminBlog,
  getUserBlogsbyID,
  getBlogsByRecent,
  getCategoryCount,
  getBlogsByViewed,
  getFeaturedBlogs,
  handleBlogLike
} from "../controllers/blogs.js";
// import { verifyToken,verifyAdmin } from '../middleware/auth.js'

export const blogsRoute = express.Router();

blogsRoute.get("/api/blog", getAllBlogs);
blogsRoute.get("/api/blog/user/:UserId", getUserBlogs);
blogsRoute.get("/api/blogs/user/:id", getUserBlogsbyID);
blogsRoute.get("/api/blogs/count", getCategoryCount);
blogsRoute.get("/api/blogs/viewed", getBlogsByViewed);


blogsRoute.get("/api/blog/latest", getBlogsByLatest);
blogsRoute.get("/api/blog/recent", getBlogsByRecent);
blogsRoute.get("/api/blog/admin", getAdminBlog);
blogsRoute.get("/api/blog/featured", getFeaturedBlogs);
blogsRoute.get("/api/blog/:id", getBlog);



blogsRoute.put("/api/blog/:id/liked/:UserId",handleBlogLike);
blogsRoute.post("/api/blog/:UserId",createBlog);
blogsRoute.put("/api/blog/:id",updateBlog);
blogsRoute.delete("/api/blog/:id",deleteBlog);
