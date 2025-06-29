require("dotenv").config();
const express = require("express");
const cors = require("cors");
const ConnectDB = require("./Config/ConnectDB");

const app = express();
const PORT = process.env.PORT || 3009;
const MONGO_URI = process.env.MONGODB_URI;

app.use(cors())

app.use(express.json());

ConnectDB(MONGO_URI);

app.use()

app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);

module.exports = app;