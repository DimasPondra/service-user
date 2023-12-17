const { validationResult } = require("express-validator");
const RefreshToken = require("../models/RefreshToken");
const User = require("../models/User");

const refreshTokenController = {
    store: async (req, res) => {
        try {
            let { token, user_id } = req.body;

            // Check validation (body)
            const errors = validationResult(req);
            const errorMessage = await Promise.all(
                errors.array({ onlyFirstError: true }).map(async (err) => {
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

            await RefreshToken.create({
                token: token,
                user_id: user_id,
            });

            return res.json({
                status: "success",
                message: "Refresh token successfully created.",
            });
        } catch (err) {
            return res.status(500).json({
                status: "error",
                message: "Something went wrong.",
                errors: err.message,
            });
        }
    },
    show: async (req, res) => {
        const refreshToken = await RefreshToken.findOne({ where: { token: req.params.token } });

        if (!refreshToken) {
            return res.status(404).json({
                status: "error",
                message: "Token not found.",
            });
        }

        const user = await User.findByPk(refreshToken.user_id);

        return res.json({
            status: "success",
            message: "Successfully get data.",
            data: {
                id: refreshToken.id,
                token: refreshToken.token,
                user: {
                    id: user.id,
                    name: user.name,
                    occupation: user.occupation,
                    email: user.email,
                    role: user.role,
                },
            },
        });
    },
};

module.exports = refreshTokenController;
