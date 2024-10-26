const Pushy = require("pushy");
const Device = require("../model/device");
var pushy = new Pushy(process.env.PUSHY_SECRET_KEY);
module.exports.register = async (req, res) => {
  const { userId, deviceToken } = req.query;

  if (!userId || !deviceToken) {
    return res
      .status(400)
      .json({ error: "User ID and device token are required" });
  }

  try {
    // Save or update the device token
    let device = await Device.findOneAndUpdate(
      { deviceToken },
      { userId, deviceToken },
      { upsert: true, new: true }
    );

    res.status(200).json({ message: "Device registered successfully", device });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

module.exports.pushNotificationOrderSuccess = async (req, res) => {
  var device = await Device.findOne({
    userId: req.params.userId,
  });
  if (device == null) {
    return res.status(500).send({
      error:
        "Please register at least one device before attempting to send notifications.",
    });
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
  pushy.sendPushNotification(
    data,
    device.deviceToken,
    options,
    function (err, id) {
      if (err) {
        return res.status(500).send({ error: err.message });
      }

      // Push sent successfully
      res.send({ success: true, pushId: id });
    }
  );
};
