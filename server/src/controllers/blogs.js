import { Op, Sequelize } from "sequelize";
import { Blogs } from "../models/blogs.js";
import { User } from "../models/user.js";

export const getAllBlogs = async (req, res) => {
  try {
    
    const blogs = await Blogs.findAll({});
    res.status(200).send(blogs);
  } catch (err) {
    res.status(500).send(err);
  }
};

export const getCategoryCount = async (req, res) => {
  try {
    
    const blogs=await Blogs.sequelize.query('SELECT Blogs.category, COUNT(*) AS Count FROM Blogs GROUP BY Blogs.category')

    res.status(200).send(blogs);
  } catch (err) {
    res.status(500).send(err);
  }
};




// SELECT Blogs.category, 
//        COUNT(*) AS Count 
// FROM   Blogs 
// GROUP  BY Blogs.category 
export const getUserBlogsbyID = async (req, res) => {
  try {
    const Id = req.params.id;
    // const UserId = req.params.UserId;

    const blog = await Blogs.findOne({ where: { id: Id } });
    if (!blog)
      return res.status(404).send("no blog with specified (id) is found! ");
    const blogs = await Blogs.findAll({ where: { UserId: blog.UserId } });
    res.status(200).send(blogs);
  } catch (err) {
    res.status(500).send(err);
  }
};

export const getUserBlogs = async (req, res) => {
  try {
    const UserId = req.params.UserId;
    const user = await User.findOne({ where: { id: UserId } });
    if (!user)
      return res.status(404).send("no user with specified (id) is found! ");
    const blogs = await Blogs.findAll({ where: { UserId: user.id } });
    res.status(200).send(blogs);
  } catch (err) {
    res.status(500).send(err);
  }
};

export const getBlogsByLatest = async (req, res) => {
  try {
    const adminUser = await User.findOne({ where: { UserName: "Admin" } });
    if (!adminUser) return res.status(404).send("admin is not found");

    const blogs = await Blogs.findAll({
      raw: true,
      order: [["createdAt", "DESC"]],
      limit: 5,
      where: { UserId: { [Op.ne]: adminUser.id } },
    });
    const users = await User.findAll({  attributes: { exclude: ['Password'] }});
    //  const { Password, ...details } = users.toJSON();

    // console.log(details);
    res.status(200).json({ blogs, users });
  } catch (err) {
    res.status(500).send(err);
  }
};

export const getBlogsByRecent = async(req,res)=>{
  try {
    const adminUser = await User.findOne({ where: { UserName: "Admin" } });
    if (!adminUser) return res.status(404).send("admin is not found");

    const blogs = await Blogs.findAll({
      raw: true,
      order: [["createdAt", "DESC"]],
      // where: { UserId: { [Op.ne]: adminUser.id } },
    });
    // const users = await User.findAll({  attributes: { exclude: ['Password'] }});
    //  const { Password, ...details } = users.toJSON();

    // console.log(details);
    res.status(200).send( blogs );
  } catch (err) {
    res.status(500).send(err);
  }
}



export const getBlog = async (req, res) => {
  try {
    const id = req.params.id;
    const blogs = await Blogs.findOne({ where: { id: id } });
    res.status(200).send(blogs);
  } catch (err) {
    res.status(500).send(err);
  }
};

export const getAdminBlog = async (req, res) => {
  try {
    const user = await User.findOne({ where: { UserName: "admin" }});
    if (!user) return res.status(404).send("admin account not found!");
    const blogs = await Blogs.findAll({ where: { UserId: user.id } });
    res.status(200).send(blogs);
  } catch (err) {
    res.status(500).send(err);
  }
};

export const createBlog = async (req, res) => {
  try {
    const { title, desc, category, photo, watched } = req.body;
    const UserId = req.params.UserId;
    const blogs = await Blogs.create({
       title: title,
//        desc: desc,
      category:category,
//       photo:photo,
      watched:watched,
      UserId:UserId
    });
    res.status(201).send(blogs);
  } catch (err) {
    res.status(500).send(err);
  }
};

export const updateBlog = async (req, res) => {
  try {
    const id = req.params.id;
    const searchedBlog = await Blogs.findOne({ where: { id: id } });
    if (!searchedBlog)
      return res.status(404).send("the blog with specified (id) is not found!");
    const blog = await Blogs.update(req.body, { where: { id: id } });
    res.status(201).send("blog updated successfully!");
  } catch (err) {
    res.status(500).send(err);
  }
};

export const deleteBlog = async (req, res) => {
  try {
    const id = req.params.id;
    const searchedBlog = await Blogs.findOne({ where: { id: id } });
    if (!searchedBlog)
      return res.status(404).send("the blog with specified (id) is not found!");
    const blog = await Blogs.destroy({ where: { id: id } });
    res.status(200).send("Blogs has been deleted successfully!");
  } catch (err) {
    res.status(500).send(err);
  }
};
