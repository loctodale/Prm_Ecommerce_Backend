const Inventory = require("../model/inventory");
class InventoryController {
  getAll = async (req, res) => {
    return res(await Inventory.find());
  };
  getByProductId = async () => {
    return res(
      await Inventory.find({
        product: req.params.id,
      })
    );
  };
  create = async (req, res) => {
    return res(await Inventory.create(...req.body));
  };
  update = async (req, res) => {
    return res(
      await Inventory.findOneAndUpdate(
        {
          _id: req.params.id,
        },
        {
          ...req.body,
        }
      )
    );
  };
}
module.exports = new InventoryController();
