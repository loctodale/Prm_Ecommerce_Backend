const User = require("../model/user");
const jwt = require("jsonwebtoken");

module.exports.login = (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  if (username && password) {
    User.findOne({
      username: username,
      password: password,
    })
      .then((user) => {
        if (user) {
          res.json({
            userId: user._id,
            token: jwt.sign(
              { user: username },
              "b7815af9e20ab0c170b0407d326524d31ac30437ade110c0f34d3187da62aba121eb61e2976c309ee23c1fb20b0aa04be8fffbd198be618d06f623605e983b034e156bfbc9e2264327c7659cfa9ccc9a7bd905a14cb99edfa48c34d5c493732f095d461679e8db54f87be564811ab4971f44be45bdf2daa2df6d420f943d9b4b1bab7ee64f4b31e9002bcc2784c6421626e0b1b6e711a4d6cef763f14aefa7cd923adbbccd55cbd50b8bda221c1c91489c9fc687d5b6f443737e3d034927c620a1e3772fed9442e743fb6c1838bf2bfb03d5f3c2ba5b56027b8bc48f296482bf5ba8c9beab980b9a9bad7a3d5114b35bedfd66780c2b5089c624946a9691818a"
            ),
          });
        } else {
          res.status(401);
          res.send("username or password is incorrect");
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }
};

module.exports.loginFireBase = async (req, res) => {
  const { googleId } = req.body;

  let foundUser = await User.findOne({
    googleId,
  });
  if (!foundUser) res.json("User not found");

  return res.json({
    userId: foundUser._id,
    token: jwt.sign(
      { user: foundUser.username },
      "b7815af9e20ab0c170b0407d326524d31ac30437ade110c0f34d3187da62aba121eb61e2976c309ee23c1fb20b0aa04be8fffbd198be618d06f623605e983b034e156bfbc9e2264327c7659cfa9ccc9a7bd905a14cb99edfa48c34d5c493732f095d461679e8db54f87be564811ab4971f44be45bdf2daa2df6d420f943d9b4b1bab7ee64f4b31e9002bcc2784c6421626e0b1b6e711a4d6cef763f14aefa7cd923adbbccd55cbd50b8bda221c1c91489c9fc687d5b6f443737e3d034927c620a1e3772fed9442e743fb6c1838bf2bfb03d5f3c2ba5b56027b8bc48f296482bf5ba8c9beab980b9a9bad7a3d5114b35bedfd66780c2b5089c624946a9691818a"
    ),
  });
};

module.exports.registerFireBase = async (req, res) => {
  const { googleId, email, name, address, phone } = req.body;
  let user = await User.create({
    username: email,
    address,
    email,
    googleId,
    name,
    phone,
  });
  return res.json({
    userId: user._id,
    token: jwt.sign(
      { user: user.username },
      "b7815af9e20ab0c170b0407d326524d31ac30437ade110c0f34d3187da62aba121eb61e2976c309ee23c1fb20b0aa04be8fffbd198be618d06f623605e983b034e156bfbc9e2264327c7659cfa9ccc9a7bd905a14cb99edfa48c34d5c493732f095d461679e8db54f87be564811ab4971f44be45bdf2daa2df6d420f943d9b4b1bab7ee64f4b31e9002bcc2784c6421626e0b1b6e711a4d6cef763f14aefa7cd923adbbccd55cbd50b8bda221c1c91489c9fc687d5b6f443737e3d034927c620a1e3772fed9442e743fb6c1838bf2bfb03d5f3c2ba5b56027b8bc48f296482bf5ba8c9beab980b9a9bad7a3d5114b35bedfd66780c2b5089c624946a9691818a"
    ),
  });
};
