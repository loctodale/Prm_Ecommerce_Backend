const mongoose = require("mongoose");
const schema = mongoose.Schema;

const userSchema = new schema({
  email: {
    type: String,
    required: true,
  },
  username: {
    type: String,
  },
  password: {
    type: String,
  },
  name: {
    type: String,
    required: true,
  },
  address: String,
  phone: String,
  googleId: {
    type: String,
  },
  wishList: [
    {
      type: schema.Types.ObjectId,
      ref: "Product",
    },
  ],
});

module.exports = mongoose.model("User", userSchema);
