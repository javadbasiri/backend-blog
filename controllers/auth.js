const UserModel = require("../models/User");

exports.register = async (req, res) => {
  try {
    const { userName, password, email } = req.body;

    await UserModel.validateAuth(req.body);

    const user = await UserModel.findOne({ email });

    if (user) throw new Error("user is already exist.");

    const newUser = new UserModel({
      userName,
      password,
      email,
    });

    newUser
      .save()
      .then(() => res.status(200).send("user registered successfuly."))
      .catch((err) => {
        if (err) throw err;
      });
  } catch (error) {
    const errors = [];

    if (error.inner) {
      error.inner.forEach((error) => {
        errors.push(error.message);
      });
    } else errors.push(error.message);

    res.status(500).send({ errors });
  }
};
