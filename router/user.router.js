const router = require("express").Router();
const UserModel = require("../models/user.model");
//get user with id
router.get("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    var user = await UserModel.findById(id);
    return res.json(user);
  } catch {
    return res.json({ error: "No such user found" });
  }
});
//create new user
router.post("/create", async (req, res) => {
  const { name, email, referredUser, isPaymentMade, totalEarnings } = req.body;
  var user = await UserModel.findOne({ email });
  if (user) {
    return res.json({ error: "User with same email already exsists" });
  }
  user = await UserModel.create({
    name,
    email,
    referredUser,
    isPaymentMade,
    totalEarnings,
  });
  return res.json(user);
});

module.exports = router;
