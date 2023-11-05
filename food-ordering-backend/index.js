const express = require("express");
const cors = require("cors");
const app = express();
const port = 3001;

// -----------DATABASE-------------
const mongoose = require("mongoose");
const url = "mongodb://127.0.0.1:27017/";
const dbName = "food-ordering";

mongoose
  .connect(url + dbName, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("ERROR:", err);
  });
// ------------------------------

const userRouter = require("./routers/users");
const contentRouter = require("./routers/content");

app.use("/img", express.static("content"));

app.use(cors());
app.use(express.json());
app.use("/users", userRouter);
app.use("/contents", contentRouter);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
