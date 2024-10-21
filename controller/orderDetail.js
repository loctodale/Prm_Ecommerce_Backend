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
}
