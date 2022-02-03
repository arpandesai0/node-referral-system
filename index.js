const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const app = express();
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log("Server started on port " + PORT));

//
app.use(express.json());
mongoose.connect(process.env.MONGODB_URI, () =>
  console.log("Connected to database")
);
//
const referrerRouter = require("./router/referrer.router");
app.use("/", referrerRouter);
const userRouter = require("./router/user.router");
app.use("/user", userRouter);
