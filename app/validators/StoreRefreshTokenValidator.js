const { body } = require("express-validator");
const User = require("../models/User");

const rules = [
    body("token", "Token is required.").notEmpty(),
    body("user_id", "User ID is required.")
        .notEmpty()
        .isInt()
        .withMessage("User ID must be an integer.")
        .custom(async (value) => {
            const user = await User.findByPk(value);

            if (!user) {
                throw new Error("User not found.");
            }
        }),
];

module.exports = rules;
