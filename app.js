const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");

const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");
const { isAuthenticated } = require("./middlewares/isAuthenticated");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

app.use(morgan("dev"));

app.use("/auth", authRoutes);
app.use("/user", isAuthenticated, userRoutes);

module.exports = app;
