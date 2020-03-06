const http = require("http");
const express = require("express");
const app = express();

app.use("/add-product", (req, res, next) => {
  console.log("In another middeleware");
  res.send("<h1>The add product</h1>");
});

app.use("/", (req, res, next) => {
  console.log("In another middeleware");
  res.send("<h1>hello from express</h1>");
});

app.listen(3000);
