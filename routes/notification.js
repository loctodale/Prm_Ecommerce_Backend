const express = require("express");
const router = express.Router();
const NotificationController = require("../controller/notifycationController");

router.get("/register", NotificationController.register);
router.get(
  "/getNotification/:userId",
  NotificationController.getNotificationByUserId
);
router.get(
  "/getUnseenNotification/:userId",
  NotificationController.getUnSeenNotificationByUserId
);
router.post(
  "/pushNotificationOrderSuccess/:userId",
  NotificationController.pushNotificationOrderSuccess
);

router.put(
  "/updateSeenMessage/:messageId",
  NotificationController.updateSeenMessage
);
module.exports = router;
