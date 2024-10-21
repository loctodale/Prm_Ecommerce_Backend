const express = require("express");
const router = express.Router();
const brand = require("../controller/brandController");

router.post("/", brand.create);

module.exports = router;
