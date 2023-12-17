const { validationResult } = require("express-validator");
const User = require("../models/User");
const RefreshToken = require("../models/RefreshToken");
const bcrypt = require("bcrypt");
const apiAdapter = require("../../routes/api-adapter");
const { Op } = require("sequelize");
const { URL_SERVICE_MEDIA } = process.env;
const api = apiAdapter(URL_SERVICE_MEDIA);

const UserController = {
    register: async (req, res) => {
        try {
            let { name, occupation, email, password, avatar_file_id } = req.body;

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
    login: async (req, res) => {
        let { email, password } = req.body;

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

        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(401).json({
                status: "error",
                message: "Email or password is invalid.",
            });
        }

        const checkPassword = await bcrypt.compare(password, user.password);
        if (!checkPassword) {
            return res.status(401).json({
                status: "error",
                message: "Email or password is invalid.",
            });
        }

        return res.json({
            status: "success",
            message: "User successfully logged In.",
            data: {
                id: user.id,
            },
        });
    },
    logout: async (req, res) => {
        try {
            const user = await User.findByPk(req.params.id);

            if (!user) {
                return res.status(404).json({
                    status: "error",
                    message: "User not found.",
                });
            }

            await RefreshToken.destroy({
                where: { user_id: user.id },
            });

            return res.json({
                status: "success",
                message: "User successfully logout.",
            });
        } catch (err) {
            return res.status(500).json({
                status: "error",
                message: "Something went wrong.",
                errors: err.message,
            });
        }
    },
    index: async (req, res) => {
        let filterByIds = {};

        if (req.query.user_ids != undefined && req.query.user_ids != "") {
            const userIds = req.query.user_ids.split(",");

            filterByIds = {
                id: {
                    [Op.in]: userIds,
                },
            };
        }

        const users = await User.findAll({
            where: filterByIds,
        });

        const data = await Promise.all(
            users.map(async (user) => {
                let url = null;

                if (user.avatar_file_id != null && user.avatar_file_id != 0) {
                    const media = await api.get(`/media/${user.avatar_file_id}`);
                    url = media.data.data.url;
                }

                return {
                    id: user.id,
                    name: user.name,
                    occupation: user.occupation,
                    email: user.email,
                    role: user.role,
                    url: url,
                };
            })
        );

        return res.json({
            status: "success",
            message: "Successfully load data.",
            data: data,
        });
    },
    show: async (req, res) => {
        const user = await User.findByPk(req.params.id);

        if (!user) {
            return res.status(404).json({
                status: "error",
                message: "User not found.",
            });
        }

        let url = null;

        if (user.avatar_file_id != null && user.avatar_file_id != 0) {
            const media = await api.get(`/media/${user.avatar_file_id}`);
            url = media.data.data.url;
        }

        return res.json({
            status: "success",
            message: "Successfully get data.",
            data: {
                id: user.id,
                name: user.name,
                occupation: user.occupation,
                email: user.email,
                role: user.role,
                avatar_file_id: url,
            },
        });
    },
    update: async (req, res) => {
        try {
            const user = await User.findByPk(req.params.id);

            if (!user) {
                return res.status(404).json({
                    status: "error",
                    message: "User not found.",
                });
            }

            let { name, occupation, email, password, avatar_file_id } = req.body;

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

            const passwordHash = await bcrypt.hash(password, 10);

            await user.update({
                name: name,
                occupation: occupation,
                email: email,
                password: passwordHash,
                avatar_file_id: avatar_file_id == 0 ? null : avatar_file_id,
            });

            return res.json({
                status: "success",
                message: "User successfully updated.",
            });
        } catch (error) {
            return res.status(500).json({
                status: "error",
                message: "Something went wrong.",
                errors: err.message,
            });
        }
    },
};

module.exports = UserController;
