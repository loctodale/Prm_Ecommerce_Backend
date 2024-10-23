const mongoose = require("mongoose");
const schema = mongoose.Schema;

const deliverySchema = new schema({
  order: {
    type: schema.Types.ObjectId,
    ref: "Order",
    require: true,
  },
  shipper: {
    type: schema.Types.ObjectId,
    ref: "User",
    require: true,
  },
  shippingLocation: {
    type: String,
    require: true,
  },
  shippingFee: {
    type: Number,
    require: true,
  },
});

module.exports = mongoose.model("Delivery", deliverySchema);
