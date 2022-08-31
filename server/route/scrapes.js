const express = require("express");
const scrapeController = require("../controller/scrapeController");
const authMiddleware = require('../middleware/auth')

const router = express.Router();

router.route("/").post(authMiddleware,scrapeController.ScrapeUrls);

module.exports = router;
