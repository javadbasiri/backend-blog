const express = require("express");

const userController = require("../controllers/user");

const router = express.Router();

router.get("/get", userController.getUser);

router.get("/getAll", userController.getAllUser);

module.exports = router;
