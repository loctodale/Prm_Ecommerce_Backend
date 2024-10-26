const express = require("express");
const router = express.Router();
const user = require("../controller/userController");

router.get("/", user.getAllUser);
router.get("/:id", user.getUser);
router.post("/", user.addUser);
router.put("/:id", user.editUser);
router.patch("/:id", user.editUser);
router.delete("/:id", user.deleteUser);
router.post("/updateWishList", user.updateWishList);
module.exports = router;
