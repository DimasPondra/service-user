const { Sequelize, DataTypes } = require("sequelize");
const config = require("../../config/config");
const sequelize = new Sequelize(config.development);

const blacklistToken = sequelize.define("Blacklist_Token", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    token: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    role: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    expiredAt: {
        type: DataTypes.DATE,
        allowNull: false,
        field: "expired_at",
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: "User",
            key: "id",
        },
    },
    createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        field: "created_at",
    },
    updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        field: "updated_at",
    },
});

module.exports = blacklistToken;
