const Brand = require("../model/brand");
class BrandController {
  getAll = async (req, res) => {
    const result = await Brand.find();
    return res(result);
  };
  getById = async (req, res) => {
    const result = await Brand.findById({
      _id: req.params.id,
    });
    return res(result);
  };
  create = async (req, res) => {
    const result = await Brand.create(req.body);
    res.json(result);
  };
  update = async (req, res) => {
    const result = await Brand.findOneAndUpdate(
      {
        _id: req.params.id,
      },
      {
        ...req.body,
      }
    );
    return result;
  };
}

module.exports = new BrandController();
