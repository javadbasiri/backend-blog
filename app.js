const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");

const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");

const app = express();

app.use(bodyParser.json())

if (process.env.NODE_ENV === "development") app.use(morgan("dev"));

app.use("/auth", authRoutes);
app.use("/user", userRoutes);

module.exports = app;
