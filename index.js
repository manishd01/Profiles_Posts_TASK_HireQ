require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
require("./globals");
// const authTkn = require("./authToken"); //cannot use on server side
// const authTkn = require("./controllers/authController");
// const bodyParser = require("body-parser");
const app = express();
const PORT = process.env.PORT || 3000;
// Middleware
// app.use(bodyParser.json());/
app.use(express.json());

async function db() {
  await mongoose.connect(process.env.MONGO_LINK);
  console.log("DB CONNETCED:");
}
db();
// console.log("db connected"); //for local DB:
// MongoDB Connection
// mongoose.connect("mongodb://localhost:27017/your-database", {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

const checking_token_authenticity = async (req, res, next) => {
  try {
    console.log({ authTkn }, " hello");
    // if (authTkn.authin_token === ".") {
    if (authTkn === ".") {
      return res
        .status(401)
        .json({ message: "Unauthorized: Token not provided" });
    } else {
      await next();
    }
  } catch (error) {
    return res.status(403).json({ message: "Forbidden: Invalid token" });
  }
};
// Routes

app.use("/api/auth", require("./routes/auth"));
app.use(
  "/api/profile",
  checking_token_authenticity,
  require("./routes/profile")
);
app.use("/api/posts", checking_token_authenticity, require("./routes/posts"));
app.get("/", (req, res) => {
  res.send("hello sevrer");
});
// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
