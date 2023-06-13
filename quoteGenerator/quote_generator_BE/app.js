const express = require("express");
const cors = require("cors");
const app = express();
const connectDb = require("./db/connectionDb");
const port = 3500;
require("dotenv").config();

app.use(express.json());
app.use(cors());
const auth = require("./router/authRouter");
const quoteGenerator = require("./router/quoteRouter");
const quoteCRUD = require("./router/quoteCRUDRouter");

app.use("/auth", auth);
app.use("/quote", quoteGenerator);
app.use("/quote", quoteCRUD);

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
