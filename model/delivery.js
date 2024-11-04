const mongoose = require("mongoose");
const schema = mongoose.Schema;

const deliverySchema = new schema({
  order: {
    type: schema.Types.ObjectId,
    ref: "Order",
  },
  shipper: {
    type: schema.Types.ObjectId,
    ref: "User",
  },
  shippingLocation: {
    type: String,
  },
  shippingFee: {
    type: Number,
  },
  latLocation: {
    type: String,
    required: true,
  },
  longLocation: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["Not yet", "Success"],
    default: "Not yet",
  },
});

module.exports = mongoose.model("Delivery", deliverySchema);
