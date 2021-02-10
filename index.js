const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();

const app = express();
const router = require("./src/routes");

app.use(cors());
app.use(bodyParser.json());
app.use("/api/v1", router);
const port = 5000;

app.listen(port, () => {
  console.log(`Listening to port ${port}, App Ready !`);
});
