const UserModel = require("../models/User");

exports.getUser = async (req, res) => {
  try {
    const { query } = req;

    if (!query.email) return res.status(400).send("email is required!");

    const user = await UserModel.findOne({ email: query.email });

    if (!user) return res.status(400).send("user is not registered!");

    res.send(user);
  } catch (error) {
    console.log(error);
    
    res.status(500).send(error.message);
  }
};

exports.getAllUser = async (req, res) => {
  const users = await UserModel.find().lean();
  if (!users || !users.length) return res.send("there is no registered user!");

  users.forEach(user => {
    Reflect.deleteProperty(user, 'password')
  });

  res.send(users)
};