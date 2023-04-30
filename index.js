const express = require("express");
const mongoose = require("mongoose");

const app = express();
const PORT = 3000;
require("dotenv").config();
 
app.use(express.json());
app.use("api/v1", require("./src/v1/routes/auth"));

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