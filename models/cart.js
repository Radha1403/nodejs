const fs = require("fs");
const path = require("path");
const p = path.join(
  path.dirname(process.mainModule.filename),
  "data",
  "cart.json"
);
const getProductFromCartFile = cb => {
  fs.readFile(p, (err, fileContent) => {
    if (err) {
      cb([]);
    } else if (fileContent != undefined) cb(JSON.parse(fileContent));
  });
};
module.exports = class Cart {
  constructor(p) {
    this.product = p;
  }

  add() {
    getProductFromCartFile(products => {
      products.push(this);
      fs.writeFile(p, JSON.stringify(products), err => {
        console.log(err);
      });
    });
  }

  static fetchAll(cb) {
    getProductFromCartFile(cb);
  }
};
