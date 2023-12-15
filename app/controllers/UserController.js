const { validationResult } = require("express-validator");
const User = require("../models/User");
const bcrypt = require("bcrypt");

const UserController = {
    register: async (req, res) => {
        try {
            let { name, occupation, email, password, avatar_file_id } = req.body;

            // Check validation (body)
            const errors = validationResult(req);
            const errorMessage = await Promise.all(
                errors.array().map(async (err) => {
                    return {
                        message: err.msg,
                    };
                })
            );
            if (!errors.isEmpty()) {
                return res.status(422).json({
                    status: "error",
                    message: "Unprocessable Entity.",
                    errors: errorMessage,
                });
            }

            const passwordHash = await bcrypt.hash(password, 10);

            await User.create({
                name: name,
                occupation: occupation,
                email: email,
                password: passwordHash,
                avatar_file_id: avatar_file_id == 0 ? null : avatar_file_id,
            });

            return res.json({
                status: "success",
                message: "User successfully registered.",
            });
        } catch (err) {
            return res.status(500).json({
                status: "error",
                message: "Something went wrong.",
                errors: err.message,
            });
        }
    },
};

module.exports = UserController;
