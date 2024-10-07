const UserModel = require("../models/User");

exports.register = async (req, res) => {
  try {
    const { userName, password, email } = req.body || {};

    if (!userName || !password || !email)
      return res.status(400).send("Inputs are required!");

    await UserModel.create(req.body);

    res.status(200).send("user registered successfuly!");
   
  } catch (error) {
    res.status(500).send(error.message);
  }
};
