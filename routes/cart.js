const express = require("express");
const router = express.Router();
const cart = require("../controller/cartController");

router.get("/", cart.getAllCarts);
router.get("/:id", cart.getSingleCart);
router.get("/user/:userid", cart.getCartsbyUserid);

// router.post("/", cart.addCart);
router.post("/", cart.addProductIntoCart);
router.post("/removeQuantity", cart.removeQuantityInCart);
module.exports = router;
