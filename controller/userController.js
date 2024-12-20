const User = require("../model/user");

module.exports.getAllUser = (req, res) => {
  const limit = Number(req.query.limit) || 0;
  const sort = req.query.sort == "desc" ? -1 : 1;

  User.find()
    .limit(limit)
    .sort({
      id: sort,
    })
    .then((users) => {
      res.json(users);
    })
    .catch((err) => console.log(err));
};

module.exports.getUser = async (req, res) => {
  const id = req.params.id;

  const user = await User.findOne({
    _id: id,
  }).populate({
    path: "wishList",
    populate: [
      {
        path: "images",
      },
      {
        path: "brand",
      },
      {
        path: "category",
      },
    ],
  });
  return res.json(user);
};

module.exports.addUser = async (req, res) => {
  if (typeof req.body == undefined) {
    res.json({
      status: "error",
      message: "data is undefined",
    });
  } else {
    const user = await User.create(req.body);
    return res.json(user);
  }
};

module.exports.editUser = async (req, res) => {
  if (typeof req.body == undefined || req.params.id == null) {
    res.json({
      status: "error",
      message: "something went wrong! check your sent data",
    });
  } else {
    res.json(await User.findByIdAndUpdate(req.params.id, req.body));
  }
};

module.exports.deleteUser = (req, res) => {
  if (req.params.id == null) {
    res.json({
      status: "error",
      message: "cart id should be provided",
    });
  } else {
    User.findOne({ id: req.params.id })
      .select(["-_id"])
      .then((user) => {
        res.json(user);
      })
      .catch((err) => console.log(err));
  }
};

module.exports.updateWishList = async (req, res) => {
  const { userId, productId } = req.body;

  const user = await User.findOne({
    _id: userId,
  });
  if (user == null) {
    return res.status(404).json("user not found");
  }
  const productIndex = user.wishList.indexOf(productId);

  if (productIndex > -1) {
    user.wishList.splice(productIndex, 1);
  } else {
    user.wishList.push(productId);
  }
  await user.save();
  const result = await User.findOne({
    _id: userId,
  }).populate({
    path: "wishList",
    populate: [
      {
        path: "images",
      },
      {
        path: "brand",
      },
      {
        path: "category",
      },
    ],
  });
  return res.json(result);
};
