const Cart = require("../model/cart");

module.exports.getAllCarts = async (req, res) => {
  var result = await Cart.find();
  return res.json(result);
};

module.exports.getCartsbyUserid = async (req, res) => {
  const userId = req.params.userid;

  const result = await Cart.findOne({
    user: userId,
  })
    .populate({
      path: "products.product",
      populate: [
        {
          path: "images",
        },
        {
          path: "brand",
        },
      ],
    })
    .lean();

  return res.json(result);
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

module.exports.removeQuantityInCart = async (req, res) => {
  const { userId, productId, quantity } = req.body;

  try {
    var foundCart = await Cart.findOne({ user: userId });

    if (foundCart == null) {
      return res.status(404).json({ message: "Cart not found" });
    }

    const foundProductInCart = foundCart.products.findIndex(
      (p) => p.product.toString() === productId
    );

    if (foundProductInCart > -1) {
      foundCart.products[foundProductInCart].quantity -= quantity;

      if (foundCart.products[foundProductInCart].quantity <= 0) {
        foundCart.products.splice(foundProductInCart, 1);
      }

      await foundCart.save();

      return res.status(200).json({ foundCart });
    } else {
      // If the product is not in the cart, return an appropriate message
      return res.status(404).json({ message: "Product not found in cart" });
    }
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Error updating product quantity in cart", error });
  }
};
