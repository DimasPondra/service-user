const { validationResult } = require("express-validator");
const BlacklistToken = require("../models/BlacklistToken");

const blacklistTokenController = {
    store: async (req, res) => {
        try {
            let { token, role, expired_at, user_id } = req.body;

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

            await BlacklistToken.create({
                token: token,
                role: role,
                expiredAt: expired_at,
                user_id: user_id,
            });

            return res.json({
                status: "success",
                message: "Blacklist token successfully created.",
            });
        } catch (err) {
            return res.status(500).json({
                status: "error",
                message: "Something went wrong.",
                errors: err.message,
            });
        }
    },
    check: async (req, res) => {
        const blacklistToken = await BlacklistToken.findOne({ where: { token: req.params.token } });

        if (!blacklistToken) {
            return res.status(404).json({
                status: "error",
                message: "Token not found.",
            });
        }

        return res.json({
            status: "success",
            message: "Tokens are blacklisted.",
        });
    },
};

module.exports = blacklistTokenController;
