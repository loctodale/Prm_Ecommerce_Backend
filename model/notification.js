const mongoose = require("mongoose");
const schema = mongoose.Schema;

const notificationSchema = new schema({
  user: {
    type: schema.Types.ObjectId,
    ref: "User",
  },
  title: String,
  message: String,
  imageUrl: {
    type: String,
  },
  isSeen: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("Notification", notificationSchema);
