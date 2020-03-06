const http = require("http");
const express = require("express");
const app = express();

app.use("/add-product", (req, res, next) => {
  console.log("In another middeleware");
  res.send(
    "<form action='/product' method='POST'><input type='text' name='title'/><button type='submit'>Add product</button></form>"
  );
});

app.use("/", (req, res, next) => {
  console.log("In another middeleware");
  res.send("<h1>hello from express</h1>");
});

app.listen(3000);
