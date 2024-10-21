const express = require("express");
const router = express.Router();
const CategoryController = require("../controller/categoryController");

router.get("/", CategoryController.getAll);
router.get("/:id", CategoryController.getById);
router.post("/", CategoryController.addCategory);
router.put("/", CategoryController.update);
module.exports = router;
