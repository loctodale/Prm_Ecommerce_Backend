const Cart = require("../model/cart");

module.exports.getAllCarts = (req, res) => {
  const limit = Number(req.query.limit) || 0;
  const sort = req.query.sort == "desc" ? -1 : 1;
  const startDate = req.query.startdate || new Date("1970-1-1");
  const endDate = req.query.enddate || new Date();

  console.log(startDate, endDate);

  Cart.find({
    date: { $gte: new Date(startDate), $lt: new Date(endDate) },
  })
    .select("-_id -products._id")
    .limit(limit)
    .sort({ id: sort })
    .then((carts) => {
      res.json(carts);
    })
    .catch((err) => console.log(err));
};

module.exports.getCartsbyUserid = (req, res) => {
  const userId = req.params.userid;
  const startDate = req.query.startdate || new Date("1970-1-1");
  const endDate = req.query.enddate || new Date();

  console.log(startDate, endDate);
  Cart.find({
    userId,
    date: { $gte: new Date(startDate), $lt: new Date(endDate) },
  })
    .select("-_id -products._id")
    .then((carts) => {
      res.json(carts);
    })
    .catch((err) => console.log(err));
};

module.exports.getSingleCart = (req, res) => {
  const id = req.params.id;
  Cart.findOne({
    id,
  })
    .select("-_id -products._id")
    .then((cart) => res.json(cart))
    .catch((err) => console.log(err));
};

module.exports.addCart = async (req, res) => {
  if (typeof req.body == undefined) {
    res.json({
      status: "error",
      message: "data is undefined",
    });
  } else {
    const { userId } = req.body;
    var result = await Cart.create({
      user: userId,
    });
    return res.json(result);
  }
};

module.exports.addProductIntoCart = async (req, res) => {
  const { userId, productId, quantity } = req.body;
  console.log(req.body);
  var foundCart = await Cart.findOne({
    user: userId,
  });
  if (foundCart == null) {
    var foundCart = await Cart.create({
      user: userId,
      products: [{ product: productId, quantity }],
    });
  } else {
    const foundProductInCart = foundCart.products.findIndex(
      (p) => p.product.toString() == productId
    );
    if (foundProductInCart > -1) {
      foundCart.products[foundProductInCart].quantity += quantity;
    } else {
      foundCart.products.push({ product: productId, quantity });
    }
    await foundCart.save();
  }

  return res.status(200).json({ foundCart });
};
