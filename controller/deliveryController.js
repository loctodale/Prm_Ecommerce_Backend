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
