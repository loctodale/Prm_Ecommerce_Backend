const Delivery = require("../model/delivery");
const Order = require("../model/order");
module.exports.getAll = async (req, res) => {
  return res.json(await Delivery.find().populate("order"));
};

module.exports.getById = async (req, res) => {
  return res.json(
    await Delivery.findOne({
      _id: req.params.id,
    }).populate({
      path: "order",
      populate: {
        path: "user",
      },
    })
  );
};

module.exports.getByOrderId = async (req, res) => {
  return res.json(
    await Delivery.findOne({
      order: req.params.orderId,
    })
  );
};

module.exports.getByShipperId = async (req, res) => {
  return res.json(
    await Delivery.find({
      shipper: req.params.shipperId,
    }).populate({
      path: "order",
      populate: {
        path: "user",
      },
    })
  );
};

module.exports.create = async (req, res) => {
  return res.json(await Delivery.create(req.body));
};

module.exports.update = async (req, res) => {
  return res.json(await Delivery.findByIdAndUpdate(req.params.id, req.body));
};

module.exports.updateShipSuccess = async (req, res) => {
  await Delivery.findOneAndUpdate(
    {
      _id: req.params.id,
    },
    {
      status: "Success",
    }
  );
  return res.json("Success");
};
module.exports.delete = async (req, res) => {
  return res.json(await Delivery.findByIdAndDelete(req.params.id));
};
