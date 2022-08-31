const express = require("express");
const mediaController = require("../controller/mediaUrlsController");

const router = express.Router();

router.route("/").get(mediaController.getMediaUrls);

module.exports = router;
