const http = require("http");
const server = http.createServer((req, res) => {
  console.log(req.url, req.headers, req.method);
  // process.exit(0);
  const url = req.url;
  res.setHeader("Content-Type", "text/html");
  if (url === "/") {
    res.write("<html>");
    res.write("<head><title>My First Page</title></head>");
    res.write(
      '<body><form action="/message" method="POST"><input type="text" name="message"><button type="submit">send</button></form></body>'
    );
    res.write("</html>");
    return res.end();
  }
  if (url === "/message") {
    res.write("<html>");
    res.write("<head><title>My First Page</title></head>");
    res.write("<body><h1>Hello from my node js server!!!!</h1></body>");
    res.write("</html>");
    res.end();
  }
});

server.listen(3000);
