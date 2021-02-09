const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const router = require("./src/routes");

app.use(bodyParser.json());
app.use("/api/v1/", router);
const port = 5000;

app.listen(port, () => {
  console.log(`Listening to port ${port}, App Ready !`);
});
