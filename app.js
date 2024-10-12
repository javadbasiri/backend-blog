const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");

const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");
const { isAuthenticated } = require("./middlewares/isAuthenticated");

const app = express();

app.use(bodyParser.json());

if (process.env.NODE_ENV === "development") app.use(morgan("dev"));

app.use("/auth", authRoutes);
app.use("/user", isAuthenticated, userRoutes);
app.use("/", (req, res) => res.send("home"));

module.exports = app;
