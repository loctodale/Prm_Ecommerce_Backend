const OrderDetail = require("../model/orderDetail");
class OrderDetailController {
  getAll = async (req, res) => {
    return res(await OrderDetail.find());
  };
  getByOrderId = async (req, res) => {
    return res(
      await OrderDetail.find({
        order: req.params.orderId,
      })
    );
  };
  create = async (req, res) => {
    return res.json(await OrderDetail.create(req.body));
  };
  update = async (req, res) => {
    return res.json(
      await OrderDetail.findByIdAndUpdate(req.params.id, req.body)
    );
  };
  delete = async (req, res) => {
    return res.json(await OrderDetail.findByIdAndDelete(req.params.id));
  };
}

module.exports = new OrderDetailController();
