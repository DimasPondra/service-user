const express = require("express");
const router = express.Router();

const validationStore = require("../app/validators/StoreBlacklistTokenValidator");

const blacklistTokenController = require("../app/controllers/BlacklistTokenController");

router.post("/", validationStore, blacklistTokenController.store);
router.get("/:token", blacklistTokenController.check);

module.exports = router;
