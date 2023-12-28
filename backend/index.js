
require("dotenv").config();
const express = require("express");
const connectDB = require("./db/connectdb");
const cors = require("cors");
const todo = require("./routes/Todo");

const app = express();
app.use(cors());

const port = 4000;

const DATABASE_URL = process.env.DATABASE_URL;
connectDB(DATABASE_URL);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/todo", todo);
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
