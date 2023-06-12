const express = require("express");
const app = express();
const connectDb = require("./db/connectionDb");
const port = 3500;
require("dotenv").config();

app.use(express.json());

const auth = require("./router/authRouter");
const movieList = require("./router/movieListController");

app.use("/auth", auth);
app.use("/", movieList);

const start = async () => {
  try {
    await connectDb(process.env.MONGO_URL);
    app.listen(port, () => {
      console.log(`listening on ${port}`);
    });
  } catch (err) {
    console.error(err);
  }
};
start();
