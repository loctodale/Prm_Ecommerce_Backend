const express = require("express");
const router = express.Router();
const product = require("../controller/productController");

router.get("/", product.getAllProducts);
router.get("/categories", product.getProductsInCategory);
router.get("/category/:category", product.getProductsInCategory);
router.get("/:id", product.getProduct);
router.post("/", product.addProduct);
router.put("/:id", product.editProduct);
router.delete("/:id", product.deleteProduct);

module.exports = router;
