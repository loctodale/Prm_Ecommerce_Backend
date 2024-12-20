const express = require("express");
const router = express.Router();
const DeliveryController = require("../controller/deliveryController");

router.get("/", DeliveryController.getAll);
router.get("/:id", DeliveryController.getById);
router.get("/order/:orderId", DeliveryController.getById);
router.get("/shipper/:shipperId", DeliveryController.getByShipperId);
router.post("/", DeliveryController.create);
router.put("/:id", DeliveryController.update);
router.put("/updateShipSuccess/:id", DeliveryController.updateShipSuccess);
router.delete("/:id", DeliveryController.delete);

module.exports = router;
