const mongoose = require("mongoose");
const schema = mongoose.Schema;

const inventorySchema = new schema({
  product: {
    type: schema.Types.ObjectId,
    ref: "product",
    require: true,
  },
  stock: {
    type: Number,
    require: true,
  },
  isDelete: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("inventory", inventorySchema);
