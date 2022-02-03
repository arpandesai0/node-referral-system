const router = require("express").Router();
const UserModel = require("../models/user.model");
router.get("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    var user = await UserModel.findByIdAndUpdate(id, {
      $set: { isPaymentMade: true },
    });
    user = JSON.parse(JSON.stringify(user));
    const referralId = user.referredUser;
    if (!referralId) {
      return res.json({ message: "You haven't referred by anyone" });
    }
    if (user.isPaymentMade) {
      return res.json({ message: "Referral already claimed" });
    }
    try {
      const updatedUser = await UserModel.findByIdAndUpdate(referralId, {
        $inc: { totalEarnings: 10 },
      });
      return res.json({
        message:
          "Referred successfully! Amount credited to " +
          JSON.parse(JSON.stringify(updatedUser)).name,
      });
    } catch {
      return res.json({ message: "You haven't referred by anyone" });
    }
  } catch {
    return res.json({ error: "No user found" });
  }
});
module.exports = router;
