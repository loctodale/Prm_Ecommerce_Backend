const express = require("express");
const router = express.Router();
const image = require("../controller/imageController");

router.post("/", image.create);

module.exports = router;
