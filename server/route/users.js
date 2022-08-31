const express = require("express");
const userController = require("../controller/userController");

const router = express.Router();

router.route("/register").post(userController.CreateUser);
router.route("/login").post(userController.LoginUser);

module.exports = router;
