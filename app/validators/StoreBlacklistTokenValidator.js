const { body } = require("express-validator");
const User = require("../models/User");

const rules = [
    body("token", "Token is required.").notEmpty(),
    body("role", "Role is required.").notEmpty(),
    body("expired_at", "Expired date is required.")
        .notEmpty()
        .isISO8601()
        .withMessage("Expired date must be in ISO 8601 format (YYYY-MM-DD HH:mm:ss).")
        .matches(/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/)
        .withMessage("Invalid date and time format. Must be YYYY-MM-DD HH:mm:ss."),
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
