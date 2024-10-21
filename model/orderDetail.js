const mongoose = require("mongoose");
const schema = mongoose.Schema;

const orderDetailSchema = new schema({
  product: {
    type: schema.Types.ObjectId,
    ref: "product",
    require: true,
  },
  order: {
    type: schema.Types.ObjectId,
    ref: "order",
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

module.exports = mongoose.model("order_detail", orderDetailSchema);
