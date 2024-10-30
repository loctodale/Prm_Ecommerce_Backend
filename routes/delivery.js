const express = require("express");
const router = express.Router();
const DeliveryController = require("../controller/deliveryController");

router.get("/", DeliveryController.getAll);
router.get("/order/:id", DeliveryController.getById);
router.post("/", DeliveryController.create);
router.put("/:id", DeliveryController.update);
router.delete("/:id", DeliveryController.delete);

module.exports = router;