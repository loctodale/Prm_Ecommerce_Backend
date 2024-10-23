const Product = require("../model/product");

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
      .select(["-_id"])
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
module.exports.getProductsInCategory = (req, res) => {
  const category = req.params.category;
  const limit = Number(req.query.limit) || 0;
  const sort = req.query.sort == "desc" ? -1 : 1;

  Product.find({
    category,
  })
    .select(["-_id"])
    .limit(limit)
    .sort({ id: sort })
    .then((products) => {
      res.json(products);
    })
    .catch((err) => console.log(err));
};

module.exports.addProduct = async (req, res) => {
  if (typeof req.body == undefined) {
    res.json({
      status: "error",
      message: "data is undefined",
    });
  }
  const result = await Product.create(req.body);

  res.json(result);
};

module.exports.editProduct = (req, res) => {
  if (typeof req.body == undefined || req.params.id == null) {
    res.json({
      status: "error",
      message: "something went wrong! check your sent data",
    });
  } else {
    res.json({
      id: req.params.id,
      title: req.body.title,
      price: req.body.price,
      description: req.body.description,
      image: req.body.image,
      category: req.body.category,
    });
  }
};

module.exports.deleteProduct = (req, res) => {
  if (req.params.id == null) {
    res.json({
      status: "error",
      message: "cart id should be provided",
    });
  } else {
    Product.findOne({
      id: req.params.id,
    })
      .select(["-_id"])
      .then((product) => {
        res.json(product);
      })
      .catch((err) => console.log(err));
  }
};
