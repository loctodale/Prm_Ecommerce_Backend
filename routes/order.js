const express = require("express");
const router = express.Router();
const OrderController = require("../controller/orderController");

router.get("/", OrderController.getAll);
router.get("/:id", OrderController.getById);
router.get("/user/:userId", OrderController.getOrderByUserId);
router.post("/", OrderController.create);
router.post("/createOrderStack", OrderController.createOrderStack);

module.exports = router;
