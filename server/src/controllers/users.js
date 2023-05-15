import { User } from "../models/user.js";

export const getAllUsers = async (req, res) => {
  try {
    const user = await User.findAll({});
    res.status(200).send(user);

    
  } catch (err) {
    res.status(404).send(err);
  }
};

export const getUser = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await User.findOne({ where: { id: id } });

    if (!user)
      return res
        .status(404)
        .send("user with the specified (id) is not found! ");
    const { Password, ...details } = user.toJSON();
    res.status(200).send(details);
  } catch (err) {
    res.status(500).send(err);
  }
};

// export const getUsersById = async (req, res) => {
//   try {
//     const id = req.params.id;
//     const user = await User.findOne({ where: { id: id } });

//     if(!user)return res.status(404).send('user with the specified (id) is not found! ')
//     res.status(200).send(user);
//   } catch (err) {
//     res.status(500).send(err);
//   }
// };

export const createUser = async (req, res) => {
  try {
    const newUser = await User.create(req.body);
    res.status(201).send(newUser);
  } catch (err) {
    res.status(500).send(err);
  }
};

export const updateUser = async (req, res) => {
  try {
    const id = req.params.id;
    const searchUser = await User.findOne({ where: { id: id } });

    if (!searchUser) return res.status(404).send("user not found");
    const user = await User.update(req.body, { where: { id: id } });
    // if(!user)return res.status(404).send('user with the specified (id) is not found! ')
    res.status(201).send("user updated successfully");
  } catch (err) {
    res.status(500).send(err);
  }
};

export const deleteUser = async (req, res) => {
  try {
    const id = req.params.id;
    const searchUser = await User.findOne({ where: { id: id } });
    if (!searchUser) return res.status(404).send("user not found");

    const user = await User.destroy({ where: { id: id } });
    res.status(200).send("user has been deleted successfully!");
  } catch (err) {
    res.status(500).send(err);
  }
};
