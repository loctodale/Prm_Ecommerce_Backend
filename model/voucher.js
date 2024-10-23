const mongoose = require("mongoose");
const schema = mongoose.Schema;

const voucherSchema = new schema({
  code: {
    type: String,
    require: true,
  },
  name: {
    type: String,
    require: true,
  },
  condition: {
    type: Number,
    require: true,
  },
  type: {
    type: String,
    require: true,
  },
  value: {
    type: Number,
    require: true,
  },
  quantity: {
    type: Number,
    require: true,
  },
  isDelete: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("Voucher", voucherSchema);
