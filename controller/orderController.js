const Order = require("../model/order");
class OrderController {
  getAll = async (req, res) => {
    return res(await Order.find());
  };
  getById = async (req, res) => {
    return res(
      await Order.findById({
        _id: req.params.id,
      })
    );
  };
  create = async (req, res) => {
    return res(await Order.create(...req.body));
  };
}

module.exports = new OrderController();
