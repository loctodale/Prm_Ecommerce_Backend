const Image = require("../model/image");
const Product = require("../model/product");
class ImageController {
  create = async (req, res) => {
    var result = await Image.create(req.body);
    await Product.findByIdAndUpdate(result.product, {
      $push: { images: result._id },
    });
    return res.json(result);
  };
  getByProductId = async (req, res) => {
    var result = await Image.find({
      product: req.params.id,
    });
    return res.json(result);
  };
}

module.exports = new ImageController();
