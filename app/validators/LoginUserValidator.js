const { body } = require("express-validator");

const rules = [
    body("email", "Email is required.").notEmpty().isEmail().withMessage("Email not a valid email address."),
    body("password", "Password is required.")
        .notEmpty()
        .isLength({ min: 6, max: 12 })
        .withMessage("Password min 6 and max 12 characters."),
];

module.exports = rules;
