const express = require("express");
const mongoose = require("mongoose");
const CryptoJS = require("crypto-js");
const User = require("./src/v1/models/user");
const app = express();
const PORT = 3000;
require("dotenv").config();

// Or:
try {
  // mongoose.connect(process.env.MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true });
  // MONGODB_URL = "mongodb+srv://yamamo8533:yamamoto8533@cluster0.lrvo5zd.mongodb.net/?retryWrites=true&w=majority"
  mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  console.log("DB connnected!");
} catch (error) {
  console.log(error);
}

app.get("/", (req, res) => {
  res.send("hello, express");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.post("/register", async (req, res) => {
  // パスワードの暗号化
  const password = req.body.password;

  try {
    req.body.password = CryptoJS.AES.encrypt(password, process.env.SECRET_KEY)
    const user = await User.create(req.body)
  } catch {

  }
});
