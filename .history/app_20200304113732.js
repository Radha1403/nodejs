const http = require("http");
const express = require("express");
const app = express();
app.use((req, res, next) => {
  console.log("In the middeleware");
  next();
});
app.use((req, res, next) => {
  console.log("In another middeleware");
  res.send("<h1>hello from express</h1>");
});

app.listen(3000);
