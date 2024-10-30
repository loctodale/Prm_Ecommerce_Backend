const express = require("express");
const router = express.Router();
const image = require("../controller/imageController");

router.get("/", image.getAll);
router.get("/:id", image.getByProductId);
router.post("/", image.create);
router.put("/:id", image.update);
router.delete("/:id", image.delete);

module.exports = router;
