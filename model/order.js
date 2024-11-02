const mongoose = require("mongoose");
const schema = mongoose.Schema;

const orderSchema = new schema({
  user: {
    type: schema.Types.ObjectId,
    ref: "User",
    require: true,
  },
  cart: {
    type: schema.Types.ObjectId,
    ref: "Cart",
    require: true,
  },
  voucher: {
    type: schema.Types.ObjectId,
    ref: "Voucher",
    require: true,
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
  products: [
    {
      type: schema.Types.ObjectId,
      ref: "Product",
    },
  ],
  date: {
    type: Date,
    default: Date.now,
  },
  isDelete: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("Order", orderSchema);
