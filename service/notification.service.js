const Pushy = require("pushy");
const Device = require("../model/device");
const Notification = require("../model/notification");
var pushy = new Pushy(process.env.PUSHY_SECRET_KEY);

class NotificationService {
  notificationOrderSuccess = async (userId) => {
    var device = await Device.findOne({
      userId: userId,
    });
    if (device == null) {
      return 0;
    }
    const imageUrl =
      "https://res.cloudinary.com/dijvg89ff/image/upload/v1729929194/thanks_xtbsxc.jpg";
    var data = {
      message: "Thanks for your order",
      imageUrl: imageUrl,
    };
    var options = {
      notification: {
        badge: 1,
        sound: "ping.aiff",
        body: "Thanks for your orders \u270c",
        image: imageUrl,
      },
    };
    await Notification.create({
      imageUrl,
      isSeen: false,
      message: data.message,
      title: "order",
      user: userId,
    });
    pushy.sendPushNotification(
      data,
      device.deviceToken,
      options,
      function (err, id) {
        if (err) {
          return 0;
        }
        return 1;
      }
    );
  };
}

module.exports = new NotificationService();
