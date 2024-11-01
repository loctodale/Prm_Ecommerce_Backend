const Category = require("../model/category");
const { where } = require("../model/product");
class CategoryController {
  addCategory = async (req, res) => {
    const result = await Category.create(req.body);
    return res.json(result);
  };
  getAll = (req, res) => {
    const result = Category.find().lean();
    return res.json(result);
  };
  getById = (req, res) => {
    const result = Category.findById({
      _id: req.query.id,
    }).lean();
    return res.json(result);
  };
  update = (req, res) => {
    const result = Category.findOneAndUpdate(
      {
        _id: req.params.id,
      },
      {
        ...req.body,
      }
    );

    return res.json("update success");
  };
}

module.exports = new CategoryController();
