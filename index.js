require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
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
// console.log("db connected");
// MongoDB Connection
// mongoose.connect("mongodb://localhost:27017/your-database", {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

// Routes

app.use("/api/auth", require("./routes/auth"));
app.use("/api/profile", require("./routes/profile"));
app.use("/api/posts", require("./routes/posts"));
app.get("/", (req, res) => {
  res.send("hello sevrer");
});
// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
