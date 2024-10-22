const UserModel = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const { validateLogin } = require("../validator/loginValidator");

exports.register = async (req, res) => {
  try {
    const { fullName, password, email } = req.body;

    await UserModel.validateAuth(req.body);

    const user = await UserModel.findOne({ email });

    if (user) throw new Error("user is already exist.");

    const hash = await bcrypt.hash(password, 10);

    const newUser = new UserModel({
      fullName,
      password: hash,
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

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    await validateLogin(req.body);

    const user = await UserModel.findOne({ email }).lean();

    if (!user) throw new Error("user is not registered.");

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) throw new Error("password is not correct.");
  
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    Reflect.deleteProperty(user, "password");

    res.status(200).send({ user, token });
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
