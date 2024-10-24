const mongoose = require("mongoose");
const schema = mongoose.Schema;

const cartSchema = new schema({
  user: {
    type: schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  date: {
    type: Date,
    required: true,
    default: Date.now,
  },
  products: [
    {
      product: {
        type: schema.Types.ObjectId,
        ref: "Product",
      },
      quantity: {
        type: Number,
      },
    },
  ],
});

module.exports = mongoose.model("Cart", cartSchema);
