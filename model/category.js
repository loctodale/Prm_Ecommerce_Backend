const mongoose = require("mongoose");
const schema = mongoose.Schema;

const categorySchema = new schema({
  name: String,
  isDelete: {
    type: Boolean,
    default: true,
  },
});

module.exports = mongoose.model("category", categorySchema);
