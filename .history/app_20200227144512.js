const http = require("http");
const server = http.createServer((req, res) => {
  console.log(req.url, req.headers, req.method);
  // process.exit(0);
  res.setHeader("Content-Type", "text/html");
});

server.listen(3000);
