const Order = require("../model/order");
const Cart = require("../model/cart");
const OrderDetail = require("../model/orderDetail");
const Delivery = require("../model/delivery");
const NotificationService = require("../service/notification.service");
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
    const {
      cartId,
      latLocation,
      longLocation,
      orderStatus,
      priceBeforeShip,
      totalPrice,
      shippingLocation,
      userId,
    } = req.body;
    console.log(req.body);
    const newOrder = await Order.create({
      priceBeforeShip,
      status: orderStatus,
      totalPrice,
      user: userId,
      voucher: null,
    });
    let arrayOrderDetail = [];
    const foundCart = await Cart.findById(cartId).populate({
      path: "products.product",
      populate: [
        {
          path: "category",
        },
      ],
    });
    foundCart.products.map((x) => {
      arrayOrderDetail.push({
        product: x.product,
        order: newOrder._id,
        unitPrice: x.product.price,
        quantity: x.quantity,
        totalPrice: x.product.price * x.quantity,
      });
    });
    console.log(arrayOrderDetail);
    await OrderDetail.insertMany(arrayOrderDetail);
    const newDeli = await Delivery.create({
      latLocation,
      longLocation,
      order: newOrder._id,
      shippingFee: totalPrice - priceBeforeShip,
      shippingLocation: shippingLocation,
    });
    await Cart.findByIdAndDelete(cartId);
    NotificationService.notificationOrderSuccess(userId);
    return res.json("Success");
  };
}

module.exports = new OrderController();
