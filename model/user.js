const mongoose = require("mongoose");
const schema = mongoose.Schema;

const userSchema = new schema({
  email: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  address: String,
  phone: String,
});

module.exports = mongoose.model("user", userSchema);
