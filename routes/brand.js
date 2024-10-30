const express = require("express");
const router = express.Router();
const brand = require("../controller/brandController");

router.get("/", brand.getAll);
router.get("/:id", brand.getById);
router.post("/", brand.create);
router.put("/", brand.update);
router.delete("/:id", brand.delete);
module.exports = router;
