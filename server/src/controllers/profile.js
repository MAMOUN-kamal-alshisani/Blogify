import { Profile } from "../models/profile.js";

export const getAllProfiles = async (req,res) => {
  try {
    const profile = await Profile.findAll({});

    res.status(200).send(profile);
  } catch (err) {
    res.status(500).send(err);
  }
};

export const getProfile = async (req, res) => {
  try {
    const id = req.params.id;
    const profile = await Profile.findOne({ where: { id: id } });
    if(!profile) return res.status(404).send('profile with specified (id) is not found!')
    res.status(200).send(profile);
  } catch (err) {
    res.status(500).send(err);
  }
};

export const createProfile = async (req, res) => {
  try {
    const { fullName, gender, country, city, phone, birthDate, picture } = req.body;
    const UserId = req.params.UserId;
    const profile = await Profile.create({
      fullName: fullName,
      gender:gender,
      country: country,
      city: city,
      phone: phone,
      birthDate: birthDate,
      picture: picture,
      UserId: UserId,
    });
    res.status(201).send(profile);
  } catch (err) {
    res.status(500).send(err);
  }
};

export const updateProfile = async (req, res) => {
  try {
    // const { title, desc, category, photo, watched } = req.body;
    const id = req.params.id;
    const SearchProfile = await Profile.findOne({ where: { id: id } });
    if(!SearchProfile) return res.status(404).send('profile with specified (id) is not found!')
    const profile = await Profile.update(req.body, { where: { id: id } });
    res.status(201).send('specified profile updated successfully!');
  } catch (err) {
    res.status(500).send(err);
  }
};

export const deleteProfile = async (req, res) => {
  try {
    const id = req.params.id;
    const SearchProfile = await Profile.findOne({ where: { id: id } });
    if(!SearchProfile) return res.status(404).send('profile with specified (id) is not found!')
    const blog = await Profile.destroy({ where: { id: id } });
    res.status(200).send("Profile has been deleted successfully!");
  } catch (err) {
    res.status(500).send(err);
  }
};
