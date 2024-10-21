const mongoose = require("mongoose");
const schema = mongoose.Schema;

const brandSchema = new schema({
  name: String,
});

module.exports = mongoose.model("brand", brandSchema);
