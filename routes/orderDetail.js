const express = require("express");
const router = express.Router();
const OrderDetailController = require("../controller/orderDetailController");

router.get("/", OrderDetailController.getAll);
router.get("/:id", OrderDetailController.getByOrderId);
router.post("/", OrderDetailController.create);
router.put("/:id", OrderDetailController.update);
router.delete("/:id", OrderDetailController.delete);

module.exports = router;
