const mongoose = require("mongoose");
const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    referredUser: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "UserSchema",
    },
    isPaymentMade: {
      type: Boolean,
      default: false,
    },
    totalEarnings: {
      type: Number,
      default: 0,
    },
  },
  { collection: "booksapp_users" }
);
module.exports = mongoose.model("UserSchema", UserSchema);
