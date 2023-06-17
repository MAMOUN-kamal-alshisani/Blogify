import { Op, Sequelize, where } from "sequelize";
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
    const blogs = await Blogs.findAll({
      group: ["category"],
      attributes: ["category", [Sequelize.fn("COUNT", "category"), "count"]],
    });

    // const blogs=await Blogs.sequelize.query('SELECT Blogs.category, COUNT(*) AS Count FROM Blogs GROUP BY Blogs.category')

    res.status(200).send([blogs]);
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
    const adminUser = await User.findOne({ where: { isAdmin: true } });
    if (!adminUser) return res.status(404).send("admin is not found");

    const blogs = await Blogs.findAll({
      raw: true,
      order: [["createdAt", "DESC"]],
      limit: 5,
      where: { UserId: { [Op.ne]: adminUser.id } },
    });
    // const users = await User.findAll({ attributes: { exclude: ["Password"] } });
    //  const { Password, ...details } = users.toJSON();
    // , users 
    // console.log(details);
    res.status(200).json({ blogs});
  } catch (err) {
    res.status(500).send(err);
  }
};

export const getBlogsByRecent = async (req, res) => {
  try {
    // const adminUser = await User.findOne({ where: { UserName: "Admin" } });
    // if (!adminUser) return res.status(404).send("admin is not found");

    const blogs = await Blogs.findAll({
      raw: true,
      order: [["createdAt", "DESC"]],
      // where: { UserId: { [Op.ne]: adminUser.id } },
    });
    // const users = await User.findAll({  attributes: { exclude: ['Password'] }});
    //  const { Password, ...details } = users.toJSON();

    // console.log(details);
    res.status(200).send(blogs);
  } catch (err) {
    res.status(500).send(err);
  }
};

export const getBlogsByViewed = async (req, res) => {
  try {
    const blogs = await Blogs.findAll({
      raw: true,
      order: [["watched", "DESC"]],
    });
    res.status(200).send(blogs);
  } catch (err) {
    res.status(500).send(err);
  }
};
export const getFeaturedBlogs = async (req, res) => {
  try {
    const blogs = await Blogs.findAll({
      where: { featured: true },
    });
    res.status(200).send(blogs);
  } catch (err) {
    res.status(500).send(err);
  }
};

// export const getLikedBlogUserId = async (req, res) => {
//   try {
//     const UserId = req.params.UserId;
//     const id = req.params.id;
//     const blogs = await Blogs.findOne({
//       where: { id: id },
//     });
//     // console.log(blogs);
//     // let liked =  blogs.liked.find((int)=> int == 15)
//     let liked = await blogs.liked.includes(parseInt(UserId));
//     res.status(200).send(liked);
//   } catch (err) {
//     res.status(500).send(err);
//   }
// };

export const handleBlogLike = async (req, res) => {
  try {
    const UserId = req.params.UserId;
    const id = req.params.id;
    const blogs = await Blogs.findOne({
      where: { id: id }
    });
    // console.log(blogs);
    // let liked =  blogs.liked.find((int)=> int == 15)
    let liked = await blogs.liked.includes(parseInt(UserId));
    // console.log( blogs.liked.filter(ele=> ele !== parseInt(UserId)), 'sadsasadasdasdasdasdasdasdassssssssssssssssssssssss');

    if (liked) {
      let removeLike = blogs.liked.filter(
        (ele) => ele !== parseInt(UserId)
      );
      await Blogs.update({ liked: removeLike },{where:{id:id}});
      res.status(200).send("blog unliked successfully!");
    } else {
      let userLike =  blogs.liked
        userLike.push(parseInt(UserId));
      // console.log('sfafafasfasfasfasfasfasf',userLike);
      await Blogs.update({ liked: userLike },{where:{id:id}});
      res.status(200).send("blog liked successfully!");
    }
  } catch (err) {
    res.status(500).send(err);
  }
};
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
    const user = await User.findOne({ where: { isAdmin: true } });
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
      desc: desc,
      category: category,
      photo: photo,
      watched: watched,
      UserId: UserId,
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
