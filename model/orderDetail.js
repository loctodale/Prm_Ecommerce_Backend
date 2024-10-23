const mongoose = require("mongoose");
const schema = mongoose.Schema;

const orderDetailSchema = new schema({
  product: {
    type: schema.Types.ObjectId,
    ref: "Product",
    require: true,
  },
  order: {
    type: schema.Types.ObjectId,
    ref: "Order",
    require: true,
  },
  totalPrice: {
    type: Number,
    require: true,
  },
  unitPrice: {
    type: Number,
    require: true,
  },
  quantity: {
    type: Number,
    require: true,
  },
});

module.exports = mongoose.model("Order_Detail", orderDetailSchema);
