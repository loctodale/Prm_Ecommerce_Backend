const mongoose = require("mongoose");
const schema = mongoose.Schema;

const imageSchema = new schema({
  imageUrl: {
    type: String,
    require: true,
  },
  product: {
    type: schema.Types.ObjectId,
    ref: "Product",
    require: true,
  },
});

module.exports = mongoose.model("Image", imageSchema);
