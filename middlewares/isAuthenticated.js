const UserModel = require("../models/User");
const jwt = require("jsonwebtoken");

exports.isAuthenticated = async (req, res, next) => {
  try {
    const authorizationHeader = req.header("Authorization")?.split(" ");

    const token = authorizationHeader[1];

    if (!token) throw new Error("");

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await UserModel.findById(decoded.id).lean();

    if (!user) throw new Error("");

    Reflect.deleteProperty(user, "password");

    req.user = user;

    next();
  } catch (error) {
    res.status(401).send({ errors: ["you are not authenticated."] });
  }
};
