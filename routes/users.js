const express = require("express");
const router = express.Router();

const validationRegister = require("../app/validators/RegisterUserValidator");
const validationLogin = require("../app/validators/LoginUserValidator");

const userController = require("../app/controllers/UserController");

router.post("/register", validationRegister, userController.register);
router.post("/login", validationLogin, userController.login);

module.exports = router;
