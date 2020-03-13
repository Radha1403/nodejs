const fs = require("fs");
const path = require("path");
const Cart = require("./cart");
const p = path.join(
  path.dirname(process.mainModule.filename),
  "data",
  "products.json"
);
const getProductsFromFile = cb => {
  fs.readFile(p, (err, fileContent) => {
    if (err) {
      cb([]);
    } else if (fileContent.length > 0) {
      cb(JSON.parse(fileContent));
    } else {
      cb([]);
    }
  });
};

module.exports = class Product {
  constructor(id, title, imageUrl, description, price) {
    this.id = id;
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }

  save() {
    getProductsFromFile(products => {
      if (this.id) {
        const exisitingProductIndex = products.findIndex(
          prod => prod.id === this.id
        );
        const updatedProducts = [...products];
        updatedProducts[exisitingProductIndex] = this;
        fs.writeFile(p, JSON.stringify(updatedProducts), err => {
          if (err) console.log(err);
        });
      } else {
        this.id = Math.random().toString();
        products.push(this);
        fs.writeFile(p, JSON.stringify(products), err => {
          console.log(err);
        });
      }
    });
  }

  static fetchAll(cb) {
    getProductsFromFile(cb);
  }

  static findById(id, cb) {
    getProductsFromFile(products => {
      const product = products.find(p => p.id === id);
      cb(product);
    });
  }

  static findByIds(ids, cb) {
    getProductsFromFile(products => {
      var prodList = products.filter(x => {
        console.log(ids.includes(x.id));
        if (ids.includes(x.id)) return x;
      });
      cb(prodList);
    });
  }

  static delete(id) {
    getProductsFromFile(products => {
      const product = products.find(prod => prod.id === id);
      var updatedProducts = products.filter(p => p.id != id);
      fs.writeFile(p, JSON.stringify(updatedProducts), err => {
        if (!err) {
          Cart.deleteProduct(id, product.price);
        }
        if (err) console.log(err);
      });
    });
  }
};
