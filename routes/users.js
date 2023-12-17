const express = require("express");
const router = express.Router();

const validationRegister = require("../app/validators/RegisterUserValidator");
const validationLogin = require("../app/validators/LoginUserValidator");
const validationUpdate = require("../app/validators/UpdateUserValidator");

const userController = require("../app/controllers/UserController");

router.post("/register", validationRegister, userController.register);
router.post("/login", validationLogin, userController.login);
router.get("/", userController.index);
router.get("/:id", userController.show);
router.patch("/:id", validationUpdate, userController.update);

module.exports = router;
