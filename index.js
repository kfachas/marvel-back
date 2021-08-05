const express = require("express");
const formidableMiddleware = require("express-formidable");
const cors = require("cors");
const axios = require("axios");
const mongoose = require("mongoose");
require("dotenv").config();

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

const userRoute = require("./routes/users");
const app = express();
app.use(formidableMiddleware());
app.use(cors());
app.use(userRoute);

app.get("/favorites", async (req, res) => {
  try {
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.get("/comics/:id", async (req, res) => {
  try {
    const response = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/comics/${req.params.id}?apiKey=${process.env.MARVEL_API_KEY}`
    );
    res.status(200).json(response.data);
  } catch (error) {
    res.status(400).json({ message: error });
  }
});

app.get("/comics", async (req, res) => {
  try {
    const response = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/comics?apiKey=${process.env.MARVEL_API_KEY}&skip=${req.query.skip}&limit=${req.query.limit}&title=${req.query.title}`
    );
    res.status(200).json(response.data);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.get("/characters", async (req, res) => {
  try {
    const response = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/characters?apiKey=${process.env.MARVEL_API_KEY}&skip=${req.query.skip}&limit=${req.query.limit}&name=${req.query.name}`
    );
    res.status(200).json(response.data);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.get("*", (req, res) => {
  res.status(400).json({ message: "Page not found" });
});

app.listen(process.env.PORT || 3000, () => {
  console.log("Server started ! 😎");
});
