const { body } = require("express-validator");
const User = require("../models/User");
const apiAdapter = require("../../routes/api-adapter");
const { URL_SERVICE_MEDIA } = process.env;
const api = apiAdapter(URL_SERVICE_MEDIA);

const rules = [
    body("name", "Name is required.").notEmpty(),
    body("email", "Email is required.")
        .notEmpty()
        .isEmail()
        .withMessage("Email not a valid email address.")
        .custom(async (value, { req }) => {
            const userId = req.params.id;

            const user = await User.findOne({ where: { email: value } });

            if (user && user.id != userId) {
                throw new Error("Email is already in use.");
            }
        }),
    body("password", "Password is required.")
        .notEmpty()
        .isLength({ min: 6, max: 12 })
        .withMessage("Password min 6 and max 12 characters."),
    body("avatar_file_id")
        .isInt()
        .withMessage("Avatar file ID must be an integer.")
        .custom(async (value) => {
            if (value != 0) {
                try {
                    await api.get(`/media/${value}`);
                } catch (err) {
                    throw new Error("File not found.");
                }
            }
        }),
];

module.exports = rules;
