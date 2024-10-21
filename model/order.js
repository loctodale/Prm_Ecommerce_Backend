const mongoose = require("mongoose");
const schema = mongoose.Schema;

const orderSchema = new schema({
  user: {
    type: schema.Types.ObjectId,
    ref: "user",
    require: true,
  },
  cart: {
    type: schema.Types.ObjectId,
    ref: "cart",
    require: true,
  },
  voucher: {
    type: schema.Types.ObjectId,
    ref: "voucher",
    require: true,
  },
  totalPrice: {
    type: Number,
    min: 1,
    require: true,
  },
  shippingFree: {
    type: Number,
    require: true,
  },
  status: {
    type: String,
    require: true,
    enum: ["pending", "success", "fail"],
  },
  isDelete: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("order", orderSchema);
