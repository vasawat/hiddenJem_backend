const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

app.use(bodyParser.json());
app.use(
  cors({
    origin: "https://hiddenjemvasawat.netlify.app",
    credentials: true,
  })
);

const url =
  "mongodb+srv://vasawat:1234@authenticationtest.9popvhf.mongodb.net/HiddenJem?retryWrites=true&w=majority";
mongoose.connect(url);
const db = mongoose.connection;
db.once("open", () => {
  console.log("DB connected");
});

const UserModel = require("./models/User");

app.get("/getName", async (req, res) => {
  const userId = "66166693b45c15e5b4940909";
  const thisUser = await UserModel.findById(userId);
  res.json(thisUser.name);
});
app.post("/editName", async (req, res) => {
  const data = req.body;
  const userId = "66166693b45c15e5b4940909";
  const thisUser = await UserModel.findById(userId);
  thisUser.name = data.name;
  await thisUser.save();
  res.json({ name: thisUser.name });
});

app.listen("5000", () => {
  console.log("Listening on port 5000");
});
