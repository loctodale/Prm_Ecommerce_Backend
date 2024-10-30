const express = require("express");
const router = express.Router();
const NotificationController = require("../controller/notifycationController");

router.get("/register", NotificationController.register);
router.get(
  "/getNotification/:userId",
  NotificationController.getNotificationByUserId
);
router.post(
  "/pushNotificationOrderSuccess/:userId",
  NotificationController.pushNotificationOrderSuccess
);
module.exports = router;
