const Delivery = require("../model/delivery");

module.exports.getAll = async (req, res) => {
  return res.json(await Delivery.find());
};

module.exports.getById = async (req, res) => {
  return res.json(
    await Delivery.findOne({
      _id: req.params.id,
    })
  );
};

module.exports.create = async (req, res) => {
  return res.json(await Delivery.create(req.body));
};

module.exports.update = async (req, res) => {
  return res.json(await Delivery.findByIdAndUpdate(req.params.id, req.body));
};
module.exports.delete = async (req, res) => {
  return res.json(await Delivery.findByIdAndDelete(req.params.id));
};
