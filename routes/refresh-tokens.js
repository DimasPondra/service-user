const express = require("express");
const router = express.Router();

const validationStore = require("../app/validators/StoreRefreshTokenValidator");

const refreshTokenController = require("../app/controllers/RefreshTokenController");

router.post("/", validationStore, refreshTokenController.store);
router.get("/:token", refreshTokenController.show);

module.exports = router;
