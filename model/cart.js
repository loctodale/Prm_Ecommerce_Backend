const mongoose = require("mongoose");
const schema = mongoose.Schema;

const cartSchema = new schema({
  user: {
    type: schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  products: [
    {
      product: {
        type: schema.Types.ObjectId,
        ref: "product",
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
    },
  ],
});

module.exports = mongoose.model("cart", cartSchema);
