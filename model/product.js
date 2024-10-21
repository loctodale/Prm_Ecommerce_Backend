const mongoose = require("mongoose");
const schema = mongoose.Schema;

const productSchema = new schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  brand: {
    type: schema.Types.ObjectId,
    ref: "brand",
    require: true,
  },
  category: {
    type: schema.Types.ObjectId,
    ref: "category",
    require: true,
  },
  description: String,
  quantitySold: Number,
  origin: String,
  status: {
    type: String,
    require: true,
    enum: ["OutOfStock", "Available"],
  },
  isDelete: {
    type: Boolean,
    default: true,
  },
  images: [{ type: schema.Types.ObjectId, ref: "Image" }],
});

module.exports = mongoose.model("Product", productSchema);
