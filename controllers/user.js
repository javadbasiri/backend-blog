const UserModel = require("../models/User");

exports.getUser = async (req, res) => {
  try {
    if (!req.user) throw new Error("user not found!");
    res.send(req.user);
  } catch (error) {
    console.log(error);
    res.status(500).send(error.message);
  }
};

exports.getAllUser = async (req, res) => {
  const users = await UserModel.find().lean();
  if (!users || !users.length) return res.send("there is no registered user!");

  users.forEach((user) => {
    Reflect.deleteProperty(user, "password");
  });

  res.send(users);
};
