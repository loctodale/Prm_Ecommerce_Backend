const mongoose = require("mongoose");
const schema = mongoose.Schema;

const orderSchema = new schema({
  user: {
    type: schema.Types.ObjectId,
    ref: "User",
    require: true,
  },
  voucher: {
    type: schema.Types.ObjectId,
    ref: "Voucher",
  },
  priceBeforeShip: {
    type: Number,
    min: 1,
    require: true,
  },
  totalPrice: {
    type: Number,
    min: 1,
    require: true,
  },
  status: {
    type: String,
    require: true,
    enum: ["pending", "success", "fail"],
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Order", orderSchema);
