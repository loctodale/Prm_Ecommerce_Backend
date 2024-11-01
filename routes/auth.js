const express = require("express");
const router = express.Router();
const auth = require("../controller/authController");

router.post("/login", auth.login);
router.post("/loginFirebase");
module.exports = router;
