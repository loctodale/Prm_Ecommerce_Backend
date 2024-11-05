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
  notificationShipSuccess = async (userId) => {
    var device = await Device.findOne({
      userId: userId,
    });
    if (device == null) {
      return 0;
    }
    const imageUrl =
      "https://res.cloudinary.com/dijvg89ff/image/upload/v1730767154/delivery-boy-picks-up-parcel-from-online-store-sending-customer-with-location-application-by-motorcycle-vector-illustration_1150-56229_xjg96x.avif";
    var data = {
      message: "Your order  ",
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
