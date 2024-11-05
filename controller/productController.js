const Product = require("../model/product");
const Inventory = require("../model/inventory");
module.exports.getAllProducts = async (req, res) => {
  const limit = Number(req.query.limit) || 0;
  const sort = req.query.sort == "desc" ? -1 : 1;

  try {
    const products = await Product.find()
      .populate({
        path: "images",
      })
      .populate({
        path: "brand",
        select: "name",
      })
      .populate({
        path: "category",
      })
      .limit(limit)
      .sort({ id: sort });
    res.json(products);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching products" + error });
  }
};

module.exports.getProduct = (req, res) => {
  var id = req.params.id;
  id = id.replace("$", "");
  console.log(id);
  try {
    Product.findOne({
      _id: id,
    })
      .populate({
        path: "brand",
        select: "name",
      })
      .populate({
        path: "images",
      })
      .populate({
        path: "category",
      })
      .then((product) => {
        res.json(product);
      });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "An error occurred while fetching products with images.",
      error: error.message,
    });
  }
};
module.exports.getProductsInCategory = async (req, res) => {
  const category = req.params.category;
  const limit = Number(req.query.limit) || 0;
  const sort = req.query.sort == "desc" ? -1 : 1;

  const product = await Product.find({
    category,
  })
    .populate({
      path: "images",
    })
    .populate({
      path: "brand",
      select: "name",
    })
    .populate({
      path: "category",
    })
    .sort({ id: sort });

  return res.json(product);
};

module.exports.addProduct = async (req, res) => {
  if (typeof req.body == undefined) {
    res.json({
      status: "error",
      message: "data is undefined",
    });
  }
  const result = await Product.create(req.body);
  const inventory = await Inventory.create({
    isDelete: false,
    product: result._id,
    stock: 1,
  });
  res.json(result);
};

module.exports.editProduct = async (req, res) => {
  const { id } = req.params;

  const result = await Product.findByIdAndUpdate(id, req.body);
  return res.json(result);
};

module.exports.deleteProduct = async (req, res) => {
  const { id } = req.params;
  let result = await Product.findByIdAndDelete(id);
  return res.json(result);
};
