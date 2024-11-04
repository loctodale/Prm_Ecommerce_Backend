const Order = require("../model/order");
class OrderController {
  getAll = async (req, res) => {
    return res.json(await Order.find());
  };
  getById = async (req, res) => {
    return res.json(
      await Order.findById({
        _id: req.params.id,
      })
    );
  };
  getOrderByUserId = async (req, res) => {
    return res.json(
      await Order.findOne({
        user: req.params.userId,
      })
    );
  };
  create = async (req, res) => {
    return res.json(await Order.create(req.body));
  };
  createOrderStack = async (req, res) => {
    console.log(req.body);
    return res.json("test");
  };
}

module.exports = new OrderController();
