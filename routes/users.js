const express = require("express");
const router = express.Router();

const userController = require("../app/controllers/UserController");
const validationRegister = require("../app/validators/RegisterUserValidator");

router.post("/register", validationRegister, userController.register);

module.exports = router;
